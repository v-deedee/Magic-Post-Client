import { HiHome, HiUserGroup } from "react-icons/hi";
import Sidebar from "../../components/SideBar";

const options = [
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
