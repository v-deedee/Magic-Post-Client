import { useThemeProvider } from "../utils/ThemeContext";

export default function ThemeToggle() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
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
        <svg
          id="theme-toggle-light-icon"
          className="absolute left-7 top-3.5 h-3 w-3"
          fill="#FFFFFE"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="absolute bottom-3 left-12 text-xs text-[#FFFFFE]">
          Light
        </span>
        <svg
          id="theme-toggle-dark-icon"
          className="absolute right-[4.2rem] top-3.5 h-3 w-3 fill-[#9399A5] peer-checked:fill-[#FFFFFE]"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <span className="absolute bottom-3 right-9 text-xs text-[#9399A5] peer-checked:text-[#FFFFFE]">
          Dark
        </span>
      </label>
    </div>
  );
}
