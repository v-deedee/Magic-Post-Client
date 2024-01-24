import { HiUserGroup } from "react-icons/hi";
import Sidebar from "../../components/SideBar";

const options = [
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
