import { Outlet } from "react-router"

const AdminLayout = () => {
  return (
    <div className="">
      mobile sidebar
      <aside className="w-full max-w-[250px] hidden lg:block">
        sidebar
      </aside>
      <aside>
        <Outlet/>
      </aside>
    </div>
  )
}

export default AdminLayout
