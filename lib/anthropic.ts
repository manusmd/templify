// Minimal server-side client for the Anthropic Messages API — writes Instagram
// captions for a template. The key is the visitor's own (stored encrypted).

const ENDPOINT = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-5";

const SYSTEM = `You write short Instagram captions for Templify, a studio that sells premium website templates (real typography, considered motion, built like client work).

Voice: confident, editorial, a little understated. Never salesy, hypey, or cringe. No "🚀", no "level up", no "game-changer".
Format: 2–4 short lines. You may use at most one tasteful emoji, or none. End with 4–6 relevant, specific hashtags on their own line.
Always include the template's live demo link naturally in the copy.
Output ONLY the caption text — no preamble, no surrounding quotes.`;

export async function generateCaption(
  apiKey: string,
  args: { name: string; tag: string; demo: string; hint?: string },
): Promise<string> {
  const user = [
    "Write an Instagram caption for this website template:",
    `Name: ${args.name}`,
    `Type: ${args.tag}`,
    `Live demo: ${args.demo}`,
    args.hint ? `Extra direction: ${args.hint}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system: SYSTEM,
        messages: [{ role: "user", content: user }],
      }),
    });
  } catch {
    throw new Error("Could not reach Anthropic. Try again.");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401) throw new Error("Anthropic rejected the API key.");
    throw new Error(data?.error?.message ?? `Anthropic error (${res.status}).`);
  }
  const text = (data?.content ?? [])
    .map((b: { type: string; text?: string }) => (b.type === "text" ? b.text : ""))
    .join("")
    .trim();
  if (!text) throw new Error("No caption was returned.");
  return text;
}

// Vision: a short phrase describing a screenshot, for the slide's subtitle.
export async function describeImage(
  apiKey: string,
  imageUrl: string,
): Promise<string> {
  const img = await fetch(imageUrl).then((r) => {
    if (!r.ok) throw new Error(`Could not load image (${r.status}).`);
    return r.arrayBuffer();
  });
  const b64 = Buffer.from(img).toString("base64");

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 40,
      system:
        "You caption a website design screenshot in 4–7 words for a slide subtitle. Describe the visual/design (layout, mood, type). No period, no quotes, no marketing hype. Return only the phrase.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: "image/jpeg", data: b64 },
            },
            { type: "text", text: "Describe this website screenshot." },
          ],
        },
      ],
    }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401) throw new Error("Anthropic rejected the API key.");
    throw new Error(data?.error?.message ?? `Anthropic error (${res.status}).`);
  }
  const text = (data?.content ?? [])
    .map((b: { type: string; text?: string }) => (b.type === "text" ? b.text : ""))
    .join("")
    .trim()
    .replace(/^["']|["'.]+$/g, "");
  if (!text) throw new Error("No description returned.");
  return text;
}
