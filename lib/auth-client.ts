"use client";

import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

// Same-origin; baseURL is inferred from the current window.
export const authClient = createAuthClient({
  plugins: [twoFactorClient()],
});
