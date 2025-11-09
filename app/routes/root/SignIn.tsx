import { Link, redirect } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
  try {
    console.log('[SignIn.loader] checking session...');
    const user = await account.get();
    console.log('[SignIn.loader] account.get() result:', user);

    if (user?.$id) {
      console.log('[SignIn.loader] user logged in -> redirecting to /dashboard');
      throw redirect('/dashboard');
    }

    return null;
  } catch (error) {
    console.warn('[SignIn.loader] no active session (expected for sign-in):', error);
    return null;
  }
}


const SignIn = () => {
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
            onClick={loginWithGoogle}
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
