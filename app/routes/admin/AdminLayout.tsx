import { Outlet, redirect, useLoaderData } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "components/NavItems";
import MobileSidebar from "components/MobileSidebar";
import { auth } from "~/firebase/firebase";
import { getExistingUser } from "~/firebase/auth";
import { useSelector } from "react-redux";
import { selectProfile } from "store/auth/authSlice";

/**
 * clientLoader() for Firebase

 */
export async function clientLoader() {
  console.log("[AdminLayout.loader] Checking Firebase auth session...");

  //  the Promise as User | null
  const user = await new Promise<User | null>((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      unsubscribe(); // cleanup listener
      resolve(firebaseUser);
    });
  });

  if (!user) {
    console.warn("[AdminLayout.loader] No active Firebase user — redirecting");
    return redirect("/sign-in");
  }

  const dbUser = await getExistingUser(user.uid);

  if (!dbUser) {
    console.warn("[AdminLayout.loader] No Firestore record for user");
    return redirect("/sign-in");
  }

  console.log("[AdminLayout.loader] Firebase user loaded:", dbUser.email);
  return dbUser;
}

/**
 * AdminLayout component
 * Uses loader data (the Firestore user object).
 */
const AdminLayout = () => {
 const user = useSelector(selectProfile);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Mobile sidebar */}
      <div className="block lg:hidden">
        <MobileSidebar user={user} />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-full max-w-[250px] h-full">
        <SidebarComponent isOpen={true} className="h-full shadow-md">
          <NavItems user={user} />
        </SidebarComponent>
      </aside>

      {/* Main content */}
      <aside className="flex-1 overflow-y-auto">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
