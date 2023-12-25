import { NavLink } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import { toggleSidebar } from "../../components/SideBarToggle";
import ThemeToggle from "../../components/ThemeToggle";
import { HiHome, HiUserGroup, HiViewGrid } from "react-icons/hi";

export default function Sidebar() {
  return (
    <>
      <aside
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform dark:border-gray-700 dark:bg-gray-800 xl:translate-x-0"
        aria-label="Sidenav"
        id="sidenav"
      >
        <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
          {/* Search box for side bar (for responsive) */}

          <div className="mt-3 xl:hidden">
            <SearchBox />
          </div>

          <ul className="space-y-2 pt-4">
            {/* Menu option */}
            <li>
              <NavLink
                to="/boss/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "group flex items-center rounded-lg bg-[#319684] p-2 text-base font-medium text-white"
                    : "group flex items-center rounded-lg p-2 text-base font-medium text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                }
              >
                <HiViewGrid />
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/boss/departments"
                className={({ isActive }) =>
                  isActive
                    ? "group flex items-center rounded-lg bg-[#319684] p-2 text-base font-medium text-white"
                    : "group flex items-center rounded-lg p-2 text-base font-medium text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                }
              >
                <HiHome />
                <span className="ml-3">Departments</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/boss/managers"
                className={({ isActive }) =>
                  isActive
                    ? "group flex items-center rounded-lg bg-[#319684] p-2 text-base font-medium text-white"
                    : "group flex items-center rounded-lg p-2 text-base font-medium text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                }
              >
                <HiUserGroup />
                <span className="ml-3">Managers</span>
              </NavLink>
            </li>
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
}
