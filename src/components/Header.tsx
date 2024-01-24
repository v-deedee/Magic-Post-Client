import logo from "/logo.svg";
import { Dropdown, Avatar } from "flowbite-react";
import { HiOutlineLogout } from "react-icons/hi";
import { toggleSidebar } from "./SideBar";

const Header: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          {/* Hamburger menu button - toggle sidebar (for responsive) */}
          <button
            className="mr-2 cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 xl:hidden"
            onClick={toggleSidebar}
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </button>

          {/* Logo */}
          <a href="#" className="flex items-center justify-start xl:pl-5">
            <img src={logo} className="logo mr-1 h-10 w-10" alt="logo" />
            <span className="hidden self-center whitespace-nowrap text-2xl font-bold dark:text-white sm:inline">
              MagicPost
            </span>
          </a>
        </div>

        {children}

        {/* User avatar */}
        <Dropdown
          label={
            <Avatar
              alt="User settings"
              img="https://picsum.photos/200"
              rounded
            />
          }
          arrowIcon={false}
          inline
        >
          <Dropdown.Item href="/login">
            <div className="flex items-center">
              <HiOutlineLogout />
              <span className="ms-2">Sign out</span>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Header;
