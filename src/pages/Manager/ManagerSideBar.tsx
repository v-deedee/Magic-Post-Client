import { HiHome, HiUserGroup, HiViewGrid } from "react-icons/hi";
import Sidebar from "../../components/SideBar";

const options = [
  {
    url: "/manager/dashboard",
    name: "Dashboard",
    icon: (
      <>
        <HiViewGrid />
      </>
    ),
  },
  {
    url: "/manager/staffs",
    name: "Manage staffs",
    icon: (
      <>
        <HiUserGroup />
      </>
    ),
  },
];

export default function ManagerSideBar() {
  return <Sidebar options={options} />;
}
