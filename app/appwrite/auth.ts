import { OAuthProvider } from "appwrite";
import { account } from "./client";

export const loginWithGoogle = async () => {
  try {
    const session = await account.createOAuth2Token(OAuthProvider.Google);
    console.log("OAuth token created:", session);
  } catch (error) {
    console.error("Login failed:", error);
  }
};


export const getGooglePicture = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    const data = await response.json();

    const name = data.names?.[0]?.displayName ?? "Unknown";
    const email = data.emailAddresses?.[0]?.value ?? "";
    const picture = data.photos?.[0]?.url ?? "";

    return { name, email, picture };
  } catch (error) {
    console.error("Error fetching Google profile:", error);
    //Return a safe fallback to avoid crashing the UI
    return { name: "", email: "", picture: "" };
  }
};




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
