import { prisma } from "./prisma";
import { encrypt, decrypt } from "./crypto";

// Setting keys. Values under SECRET_KEYS are encrypted at rest.
export const SETTING = {
  bufferApiKey: "buffer.apiKey",
  bufferOrgId: "buffer.organizationId",
  bufferChannelId: "buffer.channelId",
  bufferChannelName: "buffer.channelName",
  anthropicApiKey: "anthropic.apiKey",
} as const;

const SECRET_KEYS = new Set<string>([
  SETTING.bufferApiKey,
  SETTING.anthropicApiKey,
]);

export async function getSetting(key: string): Promise<string | null> {
  const row = await prisma.setting.findUnique({ where: { key } });
  if (!row) return null;
  if (!SECRET_KEYS.has(key)) return row.value;
  try {
    return decrypt(row.value);
  } catch {
    return null;
  }
}

export async function setSetting(key: string, value: string): Promise<void> {
  const stored = SECRET_KEYS.has(key) ? encrypt(value) : value;
  await prisma.setting.upsert({
    where: { key },
    create: { key, value: stored },
    update: { value: stored },
  });
}

export async function clearSettings(keys: string[]): Promise<void> {
  await prisma.setting.deleteMany({ where: { key: { in: keys } } });
}

export type BufferConfig = {
  apiKey: string | null;
  organizationId: string | null;
  channelId: string | null;
  channelName: string | null;
  connected: boolean;
};

export async function getBufferConfig(): Promise<BufferConfig> {
  const [apiKey, organizationId, channelId, channelName] = await Promise.all([
    getSetting(SETTING.bufferApiKey),
    getSetting(SETTING.bufferOrgId),
    getSetting(SETTING.bufferChannelId),
    getSetting(SETTING.bufferChannelName),
  ]);
  return {
    apiKey,
    organizationId,
    channelId,
    channelName,
    connected: Boolean(apiKey && channelId),
  };
}
