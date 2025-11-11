// app/routes/root/SignIn.tsx
import { Link, redirect, useNavigate } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { loginWithGoogle } from "~/firebase/auth"; // firebase auth helper
import { auth } from "~/firebase/firebase"; // firebase auth instance

// This loader runs on the client. If a Firebase session is already active,
// redirect the user to /dashboard.
export async function clientLoader() {
  try {
    // auth.currentUser is available on the client after Firebase initializes.
    const user = auth.currentUser;

    if (user?.uid) {
      // user already signed in, redirect to dashboard
      throw redirect("/dashboard");
    }

    return null;
  } catch (error) {
    // No active session is expected for sign-in page — return null so the page renders.
    console.warn("[SignIn.loader] no active session:", error);
    return null;
  }
}

const SignIn = () => {
  const navigate = useNavigate();

  // Called by the button; triggers Firebase Google login (popup).
  // On success, the auth helper stores user data in Firestore and returns the user.
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      // If you want to guard against missing user: if (!user) throw new Error("No user");
      navigate("/dashboard");
    } catch (err) {
      // surface error for debugging + show simple alert for user
      console.error("[SignIn] login failed:", err);
    }
  };

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex justify-center items-center px-6">
        <div className="flex bg-white flex-col border border-light-100 md:max-w-[510px] rounded-20 py-10 px-6 w-full">
          <header className="flex items-center flex-col pb-5 justify-center gap-2">
            <Link to="/">
              <img src="/assets/icons/logo.svg" alt="logo" className="size-8" />
            </Link>
            <h1 className="text-[20px] md:text-[28px] font-bold text-dark-100">Your Vistous</h1>
          </header>

          <article>
            <h2 className="text-2xl md:text-[28px] font-semibold text-dark-100 text-center">
              Discover Your Next Horizon
            </h2>
            <p className="pt-2 md:pt-5 text-[14px] md:text-[18px] text-center text-gray-100">
              Manage your travel plans and track activity easily by signing in with Google.
            </p>
          </article>

          <ButtonComponent
            onClick={handleLogin}
            type="button"
            className="h-11! w-full! mt-4 bg-primary-100! px-4! rounded-lg! flex! items-center! justify-center! gap-1.5! shadow-none!"
          >
            <img src="/assets/icons/google.svg" alt="google logo" />
            <span className="text-[14px] md:text-[18px] font-semibold text-white">
              Sign in With Google
            </span>
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
