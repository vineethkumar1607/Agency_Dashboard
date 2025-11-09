import { useEffect } from "react";
import { useNavigate } from "react-router";
import { account, client } from "~/appwrite/client";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeLogin = async () => {
      try {
        // ✅ 1. Check if a valid session already exists (Appwrite created it)
        const session = await account.getSession("current");
        console.log("✅ Existing session found:", session);

        // ✅ 2. Create JWT for API calls (for localhost environments)
        const jwt = await account.createJWT();
        localStorage.setItem("appwriteJWT", jwt.jwt);
        client.setJWT(jwt.jwt);

        console.log("✅ OAuth2 session established");
        navigate("/dashboard");
      } catch (error) {
        console.error("OAuth callback failed:", error);
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
