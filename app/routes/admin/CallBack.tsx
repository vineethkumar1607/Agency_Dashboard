import { useEffect } from "react";
import { useNavigate } from "react-router";
import { account, client } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeLogin = async () => {
      try {
        console.log("[Callback] Waiting for Appwrite session...");
        await new Promise((r) => setTimeout(r, 500));

        // ✅ 1. Verify OAuth session
        const user = await account.get();
        console.log("[Callback] OAuth session active:", user);

        // ✅ 2. Create JWT and apply it
        const jwt = await account.createJWT();
        client.setJWT(jwt.jwt);
        localStorage.setItem("appwriteJWT", jwt.jwt);
        console.log("[Callback] JWT created and stored");

        // ✅ 3. Determine avatar
        const googleAvatarUrl =
          user.prefs?.picture ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;

        // ✅ 4. Save user in DB (with fallback logging)
        const existing = await getExistingUser(user.$id);
        if (!existing) {
          console.log("[Callback] New user detected. Creating record...");
          await storeUserData(user.name, user.email, googleAvatarUrl);
        } else {
          console.log("[Callback] User already exists in DB:", existing.$id);
        }

        // ✅ 5. Redirect to dashboard
        navigate("/dashboard");
      } catch (err) {
        console.error("❌ OAuth callback failed:", err);
        navigate("/sign-in");
      }
    };

    completeLogin();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center text-lg text-white bg-gray-900">
      Completing Google login...
    </div>
  );
};

export default Callback;
