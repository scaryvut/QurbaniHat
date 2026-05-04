import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "https://agent-69f8a5beade440152525fc63--qurbanihat-today.netlify.app"
})
export const { signIn, signUp, useSession } = createAuthClient()