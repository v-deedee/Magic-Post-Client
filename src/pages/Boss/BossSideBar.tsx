import { HiHome, HiUserGroup, HiViewGrid } from "react-icons/hi";
import Sidebar from "../../components/SideBar";

const options = [
  {
    url: "/boss/dashboard",
    name: "Dashboard",
    icon: (
      <>
        <HiViewGrid />
      </>
    ),
  },
  {
    url: "/boss/departments",
    name: "Departments",
    icon: (
      <>
        <HiHome />
      </>
    ),
  },
  {
    url: "/boss/managers",
    name: "Managers",
    icon: (
      <>
        <HiUserGroup />
      </>
    ),
  },
];

export default function BossSideBar() {
  return <Sidebar options={options} />;
}
