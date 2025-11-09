import { ID, OAuthProvider, Query } from "appwrite";
import { account, database, appwriteConfig } from "./client";

/**
 * ✅ Start Google OAuth login using Appwrite session-based flow
 */
export const loginWithGoogle = () => {
  try {
    const successUrl = `${window.location.origin}/auth/callback`;
    const failureUrl = `${window.location.origin}/sign-in`;

    console.log("[auth] Starting OAuth redirect ->", { successUrl, failureUrl });

    // ✅ Correct scopes: only valid for Google
    account.createOAuth2Session(
      OAuthProvider.Google,
      successUrl,
      failureUrl,
      ["email", "profile", "openid"] // ✅ removed "account"
    );

    console.log("[auth] Redirecting to Google login...");
  } catch (error) {
    console.error("[auth] Google login failed:", error);
  }
};

/**
 * ✅ Get existing user from database
 */
export const getExistingUser = async (accountId: string) => {
  try {
    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersTableId,
      [Query.equal("accountId", accountId)]
    );

    return documents.length > 0 ? documents[0] : null;
  } catch (error: any) {
    console.error("Error checking if user exists:", error?.message);
    return null;
  }
};

/**
 * ✅ Create or update user in Appwrite database
 */
export const storeUserData = async (
  name: string,
  email: string,
  imageUrl: string
) => {
  try {
    const user = await account.get();
    if (!user) throw new Error("User not authenticated");

    const existingUser = await getExistingUser(user.$id);

    if (existingUser) {
      const updatedUser = await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersTableId,
        existingUser.$id,
        {
          name,
          email,
          imageUrl,
          lastLogin: new Date().toISOString(),
        }
      );
      console.log("User document updated:", updatedUser);
      return updatedUser;
    }

    // ✅ Create new record in DB
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersTableId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: imageUrl || "",
        joinedAt: new Date().toISOString(),
      }
    );

    console.log("New user document created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Failed to store user data:", error);
    throw error;
  }
};

/**
 * ✅ Logout user
 */
export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    console.log("User logged out successfully");
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};
