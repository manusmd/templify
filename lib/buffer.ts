// Minimal server-side client for Buffer's GraphQL API (https://api.buffer.com).
// Auth is a Bearer API key (from the visitor's Buffer Settings → API).

const ENDPOINT = "https://api.buffer.com";

async function gql<T>(
  apiKey: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });
  } catch {
    throw new Error("Could not reach Buffer. Check your connection and try again.");
  }
  const json = await res.json().catch(() => null);
  if (res.status === 401) throw new Error("Buffer rejected the API key (unauthorized).");
  if (!res.ok || !json || json.errors) {
    throw new Error(json?.errors?.[0]?.message ?? `Buffer API error (${res.status}).`);
  }
  return json.data as T;
}

export type BufferOrg = { id: string; name: string };
export type BufferChannel = { id: string; name: string; service: string };

export async function getOrganizations(apiKey: string): Promise<BufferOrg[]> {
  const data = await gql<{ account: { id: string; organizations: BufferOrg[] } }>(
    apiKey,
    `query { account { id organizations { id name } } }`,
  );
  return data.account?.organizations ?? [];
}

export async function getChannels(
  apiKey: string,
  organizationId: string,
): Promise<BufferChannel[]> {
  // organizationId's scalar type isn't documented, so inline the (trusted, Buffer-issued) id.
  const data = await gql<{ channels: BufferChannel[] }>(
    apiKey,
    `query {
      channels(input: { organizationId: ${JSON.stringify(organizationId)} }) { id name service }
    }`,
  );
  return data.channels ?? [];
}

export type CreatePostArgs = {
  channelId: string;
  text: string;
  imageUrl: string;
  altText?: string;
  igType?: "post" | "reel" | "story";
  mode: "addToQueue" | "customScheduled";
  dueAt?: string; // ISO 8601 UTC, required for customScheduled
};

export async function createPost(
  apiKey: string,
  a: CreatePostArgs,
): Promise<{ id: string; dueAt?: string | null }> {
  const input: Record<string, unknown> = {
    channelId: a.channelId,
    text: a.text,
    assets: [
      {
        image: {
          url: a.imageUrl,
          ...(a.altText ? { metadata: { altText: a.altText } } : {}),
        },
      },
    ],
    metadata: {
      instagram: { type: a.igType ?? "post", shouldShareToFeed: true },
    },
    schedulingType: "automatic",
    mode: a.mode,
    ...(a.mode === "customScheduled" && a.dueAt ? { dueAt: a.dueAt } : {}),
  };

  const data = await gql<{
    createPost: { post?: { id: string; dueAt?: string | null }; message?: string };
  }>(
    apiKey,
    `mutation Create($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess { post { id dueAt status } }
        ... on MutationError { message }
      }
    }`,
    { input },
  );

  if (data.createPost?.message) throw new Error(data.createPost.message);
  if (!data.createPost?.post) throw new Error("Buffer did not return a created post.");
  return data.createPost.post;
}
