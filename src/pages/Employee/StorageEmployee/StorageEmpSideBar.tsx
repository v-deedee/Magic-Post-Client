import Sidebar from "../../../components/SideBar";
import { IoIosSend } from "react-icons/io";
import { MdGetApp, MdOutlineCallReceived } from "react-icons/md";
import { FiSend } from "react-icons/fi";

const options = [
  {
    url: "/storage-employee/pts-transactions",
    name: "Receive from Post Office",
    icon: (
      <>
        <MdOutlineCallReceived />
      </>
    ),
  },
  {
    url: "/storage-employee/send-sts-transactions",
    name: "Push to Storage",
    icon: (
      <>
        <IoIosSend />
      </>
    ),
  },
  {
    url: "/storage-employee/receive-sts-transactions",
    name: "Receive from Storage",
    icon: (
      <>
        <MdGetApp />
      </>
    ),
  },
  {
    url: "/storage-employee/stp-transactions",
    name: "Push to Post Office",
    icon: (
      <>
        <FiSend />
      </>
    ),
  },
];

export default function POEmpSideBar() {
  return <Sidebar options={options} />;
}
