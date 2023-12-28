import logo from "/logo.svg";
import SidebarToggle from "./SideBarToggle";

const Header: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between">
        {/* Left side (Logo + search box) */}
        <div className="flex items-center justify-start">
          {/* Hamburger menu button - toggle sidebar (for responsive) */}
          <SidebarToggle />
          {/* Logo */}
          <a href="#" className="flex w-64 items-center justify-start xl:pl-5">
            <img src={logo} className="logo mr-1 h-10 w-10" alt="logo" />
            <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
              MagicPost
            </span>
          </a>

          {/* Search box */}
          {/* <div className="hidden xl:block xl:w-96">
            <SearchBox />
          </div> */}
        </div>

        {/* User avatar */}
        {children}
      </div>
    </nav>
  );
};

export default Header;
