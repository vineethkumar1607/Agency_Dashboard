import { account, client } from "./client";

export async function refreshJWT() {
  try {
    console.log("[Auth] Refreshing JWT...");
    const jwt = await account.createJWT();
    client.setJWT(jwt.jwt);
    localStorage.setItem("appwriteJWT", jwt.jwt);
    console.log("[Auth] JWT refreshed successfully");
    return jwt.jwt;
  } catch (error) {
    console.warn("[Auth] JWT refresh failed:", error);
    localStorage.removeItem("appwriteJWT");
    return null;
  }
}
