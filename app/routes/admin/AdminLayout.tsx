import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "components/NavItems";
import MobileSidebar from "components/MobileSidebar";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
  try {
    console.log('[AdminLayout.loader] checking session...');
    const user = await account.get();
    console.log('[AdminLayout.loader] account.get() ->', user);

    if (!user?.$id) {
      console.log('[AdminLayout.loader] no user id -> redirect to sign-in');
      return redirect('/sign-in');
    }


  } catch (error) {
    console.warn('[AdminLayout.loader] error fetching account/get ->', error);
    return redirect('/sign-in');
  }
}


const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <div className="block lg:hidden">
        <MobileSidebar />
      </div>

      <aside className="hidden lg:block w-full max-w-[250px] h-full">
        <SidebarComponent isOpen={true} className="h-full shadow-md">
          <NavItems />
        </SidebarComponent>
      </aside>

      <aside className="flex-1 overflow-y-auto">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
