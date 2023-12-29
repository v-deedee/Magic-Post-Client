import logo from "/logo.svg";
import SidebarToggle from "./SideBarToggle";
import { Dropdown, Avatar } from "flowbite-react";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
// import { HiChevronRight } from "react-icons/hi";

const Header: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between">
        {/* Left side (Logo + search box) */}
        <div className="flex items-center justify-start">
          {/* Hamburger menu button - toggle sidebar (for responsive) */}
          <SidebarToggle />
          {/* Logo */}
          <a href="#" className="flex w-60 items-center justify-start xl:pl-5">
            <img src={logo} className="logo mr-1 h-10 w-10" alt="logo" />
            <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
              MagicPost
            </span>
            {/* <span className="ms-3 pt-0.5 text-3xl">
              <HiChevronRight />
            </span> */}
          </a>
          {/* <h1 className="text-lg font-bold uppercase dark:text-white">
            Boss view
          </h1> */}
        </div>

        {/* User avatar */}
        {children}
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
          <Dropdown.Item>
            <Link to={"/login"} className="flex items-center">
              <HiOutlineLogout />
              <span className="ms-2">Sign out</span>
            </Link>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Header;
