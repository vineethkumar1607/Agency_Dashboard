import { Outlet } from "react-router";
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import NavItems from "components/NavItems";
import MobileSidebar from "components/MobileSidebar";

const AdminLayout = () => {
  return (
    <div className=" flex flex-col lg:flex-row h-screen w-full">
      <MobileSidebar/>
      
      <aside className="w-full max-w-[250px] hidden lg:block">
        <SidebarComponent>
          <NavItems/>
        </SidebarComponent>
      </aside>
      <aside>
        <Outlet/>
      </aside>
    </div>
  )
}

export default AdminLayout
