import { HiTruck, HiViewGrid } from "react-icons/hi";
import Sidebar from "../../../components/SideBar";
import { IoIosSend } from "react-icons/io";
import { MdOutlineCallReceived } from "react-icons/md";
import { RiUserReceived2Fill } from "react-icons/ri";

const options = [
  {
    url: "/post-office-employee/dashboard",
    name: "Dashboard",
    icon: (
      <>
        <HiViewGrid />
      </>
    ),
  },
  {
    url: "/post-office-employee/ctp-transactions",
    name: "Customer Transactions",
    icon: (
      <>
        <RiUserReceived2Fill />
      </>
    ),
  },
  {
    url: "/post-office-employee/pts-transactions",
    name: "Push to Storage",
    icon: (
      <>
        <IoIosSend />
      </>
    ),
  },
  {
    url: "/post-office-employee/stp-transactions",
    name: "Receive from Storage",
    icon: (
      <>
        <MdOutlineCallReceived />
      </>
    ),
  },
  {
    url: "/post-office-employee/to-ship",
    name: "To ship",
    icon: (
      <>
        <HiTruck />
      </>
    ),
  },
];

export default function POEmpSideBar() {
  return <Sidebar options={options} />;
}
