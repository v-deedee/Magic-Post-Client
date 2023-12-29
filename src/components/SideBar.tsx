import { NavLink } from "react-router-dom";
import { toggleSidebar } from "./SideBarToggle";
import ThemeToggle from "./ThemeToggle";

const Sidebar: React.FC<{
  options: Array<{
    url: string;
    name: string;
    icon: JSX.Element;
  }>;
}> = ({ options }) => {
  return (
    <>
      <aside
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform dark:border-gray-700 dark:bg-gray-800 xl:translate-x-0"
        aria-label="Sidenav"
        id="sidenav"
      >
        <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
          <ul className="space-y-2 pt-4">
            {/* Menu option */}
            {options.map((option, index) => (
              <li key={index}>
                <NavLink
                  to={option.url}
                  className={({ isActive }) =>
                    isActive
                      ? "group flex items-center rounded-lg bg-[#319684] p-2 text-base font-medium text-white"
                      : "group flex items-center rounded-lg p-2 text-base font-medium text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }
                >
                  {option.icon}
                  <span className="ml-3">{option.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Toggle dark mode */}
        <ThemeToggle />
      </aside>
      <div
        className="invisible fixed left-0 top-0 z-10 h-full w-full bg-[#00000066] opacity-0"
        id="sidebarOverlay"
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export default Sidebar;
