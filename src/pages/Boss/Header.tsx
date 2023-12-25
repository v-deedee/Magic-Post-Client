import logo from "/logo.svg";
import SearchBox from "../../components/SearchBox";
import SidebarToggle from "../../components/SideBarToggle";

export default function Header() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between">
        {/* Left side (Logo + search box) */}
        <div className="flex items-center justify-start">
          {/* Logo */}
          <a href="#" className="flex w-64 items-center justify-start md:pl-5">
            <img src={logo} className="logo mr-1 h-10 w-10" alt="logo" />
            <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
              MagicPost
            </span>
          </a>

          {/* Search box */}
          <div className="hidden md:w-64 lg:block lg:w-96">
            <SearchBox />
          </div>
        </div>

        {/* Right side (Noti + Messages + User avatar) */}
        <div className="hidden items-center lg:order-2 lg:flex">
          {/* User avatar */}
          <button
            type="button"
            className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://picsum.photos/200"
              alt="user photo"
            />
          </button>
        </div>

        {/* Hamburger menu button - toggle sidebar (for responsive) */}
        <SidebarToggle />
      </div>
    </nav>
  );
}
