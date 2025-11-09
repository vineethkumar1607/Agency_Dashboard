import { Outlet, redirect, useLoaderData } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "components/NavItems";
import MobileSidebar from "components/MobileSidebar";
import { account } from "~/appwrite/client";
import { getExistingUser } from "~/appwrite/auth";

export async function clientLoader() {
  try {
    console.log("[AdminLayout.loader] checking session...");
    const user = await account.get();
    console.log("[AdminLayout.loader] account.get() ->", user);

    if (!user?.$id) return redirect("/sign-in");

    const dbUser = await getExistingUser(user.$id);
    return dbUser || user;
  } catch (error) {
    console.warn("[AdminLayout.loader] error fetching account/get ->", error);
    return redirect("/sign-in");
  }
}

const AdminLayout = () => {
  const user = useLoaderData() as any;

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <div className="block lg:hidden">
      <MobileSidebar user={user} />
      </div>

      <aside className="hidden lg:block w-full max-w-[250px] h-full">
        <SidebarComponent isOpen={true} className="h-full shadow-md">
          <NavItems user={user} />
        </SidebarComponent>
      </aside>

      <aside className="flex-1 overflow-y-auto">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
