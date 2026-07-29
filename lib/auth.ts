import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError } from "better-auth/api";
import { prisma } from "./prisma";

/**
 * Better Auth — single-user admin.
 *
 * Sign-up is only ever allowed for the very first account: the database hook
 * below rejects any user creation once one exists, so there is exactly one
 * admin forever (the "first visit sets up the user" flow). No public
 * registration path can create a second.
 */
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const count = await prisma.user.count();
          if (count > 0) {
            throw new APIError("FORBIDDEN", {
              message: "Registration is closed — this admin already has an owner.",
            });
          }
          return { data: user };
        },
      },
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 20,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh the session once a day
  },
});

/** True when no admin has been created yet (first-run setup should show). */
export async function needsSetup(): Promise<boolean> {
  return (await prisma.user.count()) === 0;
}
