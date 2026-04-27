import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URI,
});

export const { signIn, signOut, useSession } = createAuthClient();
