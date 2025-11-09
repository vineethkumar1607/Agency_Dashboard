import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { account, client } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const completeLogin = async () => {
      try {
        console.log("[Callback] raw search params:", Object.fromEntries(searchParams.entries()));
        const userId = searchParams.get("userId");
        const secret = searchParams.get("secret");
        console.log("[Callback] userId, secret:", { userId: !!userId, secret: !!secret });

        if (!userId || !secret) throw new Error("Missing OAuth parameters");

        // ✅ Step 1: Create Appwrite session
        console.log("[Callback] Creating Appwrite session...");
        await account.createSession(userId, secret);
        console.log("✅ Session created successfully");

        // ✅ Step 2: Immediately create JWT (cross-domain fix)
        const jwt = await account.createJWT();
        client.setJWT(jwt.jwt);
        localStorage.setItem("appwriteJWT", jwt.jwt);
        console.log("✅ JWT created and set on client");

        // ✅ Step 3: Fetch user (with retry logic)
        let user = null;
        for (let i = 0; i < 3; i++) {
          try {
            user = await account.get();
            console.log(`[Callback] account.get() success on attempt ${i + 1}:`, user);
            break;
          } catch (err) {
            console.warn(`[Callback] account.get() failed attempt ${i + 1}:`, err);
            await new Promise((r) => setTimeout(r, 500));
          }
        }

        if (!user) throw new Error("User session not ready yet");
        console.log("✅ OAuth2 session + JWT established");

        // ✅ Step 4: Store user data if not already in DB
        let existing = await getExistingUser(user.$id);
        if (!existing) {
          await storeUserData(user.name, user.email, user.prefs?.avatar || "");
        }

        // ✅ Step 5: Small delay (Appwrite Cloud sync)
        await new Promise((r) => setTimeout(r, 500));

        // ✅ Step 6: Redirect to dashboard
        navigate("/dashboard");
      } catch (err) {
        console.error("❌ OAuth callback failed:", err);
        navigate("/sign-in");
      }
    };

    completeLogin();
  }, [searchParams, navigate]);

  return (
    <div className="h-screen flex items-center justify-center text-lg text-white bg-gray-900">
      Completing Google login...
    </div>
  );
};

export default Callback;
