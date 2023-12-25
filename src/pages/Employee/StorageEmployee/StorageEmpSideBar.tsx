import { HiTruck, HiViewList } from "react-icons/hi";
import Sidebar from "../../../components/SideBar";

const options = [
  {
    url: "/storage-employee/pts-transactions",
    name: "PtS Transactions",
    icon: (
      <>
        <HiViewList />
      </>
    ),
  },
  {
    url: "/storage-employee/send-sts-transactions",
    name: "(Send) StS Transactions",
    icon: (
      <>
        <HiViewList />
      </>
    ),
  },
  {
    url: "/storage-employee/receive-sts-transactions",
    name: "(Receive) StS transactions",
    icon: (
      <>
        <HiViewList />
      </>
    ),
  },
  {
    url: "/storage-employee/stp-transactions",
    name: "StP Transactions",
    icon: (
      <>
        <HiViewList />
      </>
    ),
  },
];

export default function POEmpSideBar() {
  return <Sidebar options={options} />;
}
