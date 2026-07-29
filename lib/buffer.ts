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
  imageUrls: string[]; // one = single post, many = carousel
  altText?: string;
  igType?: "post" | "reel" | "story";
  mode: ShareMode;
  dueAt?: string; // ISO 8601 UTC, required for customScheduled
};

export type ShareMode =
  | "shareNow"
  | "shareNext"
  | "addToQueue"
  | "customScheduled";

export async function createPost(
  apiKey: string,
  a: CreatePostArgs,
): Promise<{ id: string; dueAt?: string | null }> {
  const input: Record<string, unknown> = {
    channelId: a.channelId,
    text: a.text,
    assets: a.imageUrls.map((url) => ({
      image: {
        url,
        ...(a.altText ? { metadata: { altText: a.altText } } : {}),
      },
    })),
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

export type PostMetric = { type: string; name: string; value: number; unit: string };

export async function getPost(
  apiKey: string,
  id: string,
): Promise<{
  id: string;
  status: string;
  metrics: PostMetric[];
  metricsUpdatedAt: string | null;
}> {
  // id (PostId scalar) inlined — its variable type isn't documented.
  const data = await gql<{
    post: {
      id: string;
      status: string;
      metrics?: PostMetric[] | null;
      metricsUpdatedAt?: string | null;
    } | null;
  }>(
    apiKey,
    `query {
      post(input: { id: ${JSON.stringify(id)} }) {
        id
        status
        metrics { type name value unit }
        metricsUpdatedAt
      }
    }`,
  );
  if (!data.post) throw new Error("Post not found on Buffer.");
  return {
    id: data.post.id,
    status: data.post.status,
    metrics: data.post.metrics ?? [],
    metricsUpdatedAt: data.post.metricsUpdatedAt ?? null,
  };
}

// Publish an already-scheduled post immediately. Buffer has no dedicated
// "publish now" mutation and editPost is a full replace (not a patch), so we
// resend the post's content (text + media) with mode: shareNow.
export async function publishPostNow(
  apiKey: string,
  args: {
    id: string;
    text: string;
    imageUrls: string[];
    igType?: "post" | "reel" | "story";
  },
): Promise<void> {
  const data = await gql<{
    editPost: { post?: { id: string }; message?: string };
  }>(
    apiKey,
    `mutation Edit($input: EditPostInput!) {
      editPost(input: $input) {
        ... on PostActionSuccess { post { id status } }
        ... on MutationError { message }
      }
    }`,
    {
      input: {
        id: args.id,
        text: args.text,
        assets: args.imageUrls.map((url) => ({ image: { url } })),
        metadata: {
          instagram: { type: args.igType ?? "post", shouldShareToFeed: true },
        },
        schedulingType: "automatic",
        mode: "shareNow",
      },
    },
  );
  if (data.editPost?.message) throw new Error(data.editPost.message);
}

export async function deletePost(apiKey: string, postId: string): Promise<void> {
  await gql(
    apiKey,
    `mutation Del($input: DeletePostInput!) {
      deletePost(input: $input) { __typename }
    }`,
    { input: { id: postId } },
  );
}
