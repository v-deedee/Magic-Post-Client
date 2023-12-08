import { NavLink } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import { toggleSidebar } from "../../components/SideBarToggle";
import ThemeToggle from "../../components/ThemeToggle";

export default function Sidebar() {
  return (
    <>
      <aside
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform dark:border-gray-700 dark:bg-gray-800 md:translate-x-0"
        aria-label="Sidenav"
        id="sidenav"
      >
        <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
          {/* Search box for side bar (for responsive) */}

          <div className="mt-3 md:hidden">
            <SearchBox />
          </div>

          <ul className="space-y-2 pt-4">
            {/* Menu option */}
            <li>
              <NavLink
                to="/boss/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "group flex items-center rounded-lg bg-[#319684] p-2 text-base font-medium text-white dark:hover:bg-gray-700"
                    : "group flex items-center rounded-lg p-2 text-base font-medium text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                }
              >
                <svg
                  className="h-6 w-6 transition duration-75 dark:text-white dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/boss/departments"
                className={({ isActive }) =>
                  isActive
                    ? "group flex items-center rounded-lg bg-[#319684] p-2 text-base font-medium text-white dark:hover:bg-gray-700"
                    : "group flex items-center rounded-lg p-2 text-base font-medium text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                }
              >
                <svg
                  className="h-6 w-6 flex-shrink-0 p-0.5 transition duration-75 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2,9.654a1,1,0,0,0-1,1V22.821a1,1,0,0,0,2,0V10.654A1,1,0,0,0,2,9.654Z" />
                  <path d="M22,9.321a1,1,0,0,0-1,1v12.5a1,1,0,0,0,2,0v-12.5A1,1,0,0,0,22,9.321Z" />
                  <rect
                    height="6"
                    rx="0.5"
                    ry="0.5"
                    width="7"
                    x="8.5"
                    y="10.821"
                  />
                  <rect
                    height="6"
                    rx="0.5"
                    ry="0.5"
                    width="7"
                    x="12.5"
                    y="17.821"
                  />
                  <rect
                    height="6"
                    rx="0.5"
                    ry="0.5"
                    width="7"
                    x="4.5"
                    y="17.821"
                  />
                  <path d="M23.627,3.77,12.71-.124a.514.514,0,0,0-.331-.005L.386,3.777A.581.581,0,0,0,0,4.335v3.4a.565.565,0,0,0,.545.583H23.454A.565.565,0,0,0,24,7.738V4.324A.581.581,0,0,0,23.627,3.77Z" />
                </svg>
                <span className="ml-3">Departments</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Toggle dark mode */}
        <ThemeToggle />
      </aside>
      <div
        className="invisible fixed left-0 top-0 h-full w-full bg-[#00000066] opacity-0"
        id="sidebarOverlay"
        onClick={toggleSidebar}
      ></div>
    </>
  );
}
