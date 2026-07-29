"use client";

import { createAuthClient } from "better-auth/react";

// Same-origin; baseURL is inferred from the current window.
export const authClient = createAuthClient();
