import { Outlet } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "components/NavItems";
import MobileSidebar from "components/MobileSidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* ✅ Show only on small and medium screens */}
      <div className="block lg:hidden">
        <MobileSidebar />
      </div>

      {/* ✅ Show only on large and above */}
      <aside className="hidden lg:block w-full max-w-[250px] h-full">
        <SidebarComponent isOpen={true} className="h-full shadow-md">
          <NavItems />
        </SidebarComponent>
      </aside>

      {/* ✅ Main content area */}
      <aside className="flex-1 overflow-y-auto">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
