
import { useRef } from "react";
import { Link } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  const sidebarRef = useRef<SidebarComponent | null>(null);

  const toggleMenuSidebar = () => sidebarRef.current?.toggle();

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => sidebarRef.current?.hide()}
        >
          <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
          <h1 className="text-xl font-semibold">Your Vistous</h1>
        </Link>

        <button
          onClick={toggleMenuSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>

      {/* Sidebar */}
      <SidebarComponent
        ref={sidebarRef}
        created={() => sidebarRef.current?.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        enableGestures={true}
        type="Over"
        position="Left"
        className="w-[260px] bg-white shadow-lg"
      >
        <NavItems handleClick={toggleMenuSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
