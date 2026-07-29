import crypto from "crypto";

// Encrypt secrets (e.g. the Buffer API key) at rest with AES-256-GCM. The key is
// derived from BETTER_AUTH_SECRET via HKDF — no separate secret to manage.
const material = process.env.BETTER_AUTH_SECRET ?? "dev-insecure-secret";
const KEY = Buffer.from(
  crypto.hkdfSync("sha256", material, Buffer.alloc(0), "templify-settings-enc", 32),
);

export function encrypt(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, tag, enc].map((b) => b.toString("base64")).join(":");
}

export function decrypt(payload: string): string {
  const [ivB, tagB, dataB] = payload.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    KEY,
    Buffer.from(ivB, "base64"),
  );
  decipher.setAuthTag(Buffer.from(tagB, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataB, "base64")),
    decipher.final(),
  ]).toString("utf8");
}
