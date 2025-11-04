
import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";
import { cn } from "../app/lib/utils"; ;

interface NavItemsProps {
  handleClick?: () => void;
}

const NavItems = ({ handleClick }: NavItemsProps) => {
  const user = {
    name: "Vineeth",
    email: "vineethkumar1607@gmail.com",
    imageURL: "/assets/images/david.webp", 
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <section className="flex flex-col px-6 h-full">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-1.5 py-10 border-b border-light-100"
        onClick={handleClick} // ✅ closes sidebar when logo clicked
      >
        <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1 className="text-base md:text-2xl font-bold text-dark-100">
          Your Vistous
        </h1>
      </Link>

      {/* Sidebar links */}
      <div className="flex flex-col justify-between h-full">
        <nav className="flex flex-col gap-2 pt-9">
          {sidebarItems.map(({ id, href, icon, label }) => (
            <NavLink key={id} to={href} onClick={handleClick}>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={cn(
                    "group flex items-center text-xs md:text-lg font-normal cursor-pointer gap-2.5 py-[18px] px-3.5 rounded-lg text-dark-200 hover:bg-primary-100 hover:text-white transition",
                    isActive && "bg-primary-100 text-white"
                  )}
                >
                  <img
                    src={icon}
                    alt={label}
                    className={cn(
                      "size-5 transition-all group-hover:brightness-0",
                      isActive && "brightness-50 invert"
                    )}
                  />
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <footer className="flex items-center gap-3.5 pb-8">
          <img
            src={user.imageURL}
            alt={user.name}
            className="size-16 rounded-full aspect-square"
          />
          <article className="flex flex-col gap-[2px] max-w-[115px]">
            <h2 className="text-sm md:text-base font-semibold text-dark-200 truncate">
              {user.name}
            </h2>
            <p className="text-gray-100 text-xs md:text-sm font-normal truncate">
              {user.email}
            </p>
          </article>
          <button className="cursor-pointer" onClick={handleLogout}>
            <img src="/assets/icons/logout.svg" alt="logout" className="size-6" />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;
