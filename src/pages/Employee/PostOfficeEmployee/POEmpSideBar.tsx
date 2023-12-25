import { HiTruck, HiViewGrid, HiViewList } from "react-icons/hi";
import Sidebar from "../../../components/SideBar";

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
    name: "CtP Transactions",
    icon: (
      <>
        <HiViewList />
      </>
    ),
  },
  {
    url: "/post-office-employee/pts-transactions",
    name: "PtS Transactions",
    icon: (
      <>
        <HiViewList />
      </>
    ),
  },
  {
    url: "/post-office-employee/stp-transactions",
    name: "StP transactions",
    icon: (
      <>
        <HiViewList />
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
