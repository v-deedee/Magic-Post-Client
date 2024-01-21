import { NavLink } from "react-router-dom";
import { useThemeProvider } from "../utils/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

const Sidebar: React.FC<{
  options: Array<{
    url: string;
    name: string;
    icon: JSX.Element;
  }>;
}> = ({ options }) => {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

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
        <div className="absolute bottom-0 left-0 z-20 w-full justify-center space-x-4 bg-white p-6 dark:bg-gray-800 lg:flex">
          <label
            className="relative flex h-10 w-full cursor-pointer"
            htmlFor="toggle-btn"
          >
            <input
              type="checkbox"
              id="toggle-btn"
              className="peer h-0 w-0 opacity-0"
              checked={currentTheme === "dark"}
              onChange={() =>
                changeCurrentTheme(currentTheme === "light" ? "dark" : "light")
              }
            />
            <span className="absolute bottom-0 left-0 right-0 top-0 rounded-lg bg-[#F6F6F8] transition duration-500 peer-checked:bg-gray-900" />
            <span className="absolute left-1 top-1 h-8 w-1/2 rounded-lg bg-[#319684] transition duration-500 peer-checked:translate-x-24" />
            <span className="absolute left-7 top-3.5 text-xs text-[#FFFFFE]">
              <HiSun />
            </span>
            <span className="absolute bottom-3 left-12 text-xs text-[#FFFFFE]">
              Light
            </span>
            <span className="absolute right-[4.2rem] top-3.5 text-xs text-[#9399A5] peer-checked:text-[#FFFFFE]">
              <HiMoon />
            </span>
            <span className="absolute bottom-3 right-9 text-xs text-[#9399A5] peer-checked:text-[#FFFFFE]">
              Dark
            </span>
          </label>
        </div>
      </aside>
      <div
        className="invisible fixed left-0 top-0 z-10 h-full w-full bg-[#00000066] opacity-0"
        id="sidebarOverlay"
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export function toggleSidebar() {
  document.getElementById("sidenav")?.classList.toggle("translate-x-0");
  document.getElementById("sidebarOverlay")?.classList.toggle("invisible");
  document.getElementById("sidebarOverlay")?.classList.toggle("opacity-100");
}

export default Sidebar;
