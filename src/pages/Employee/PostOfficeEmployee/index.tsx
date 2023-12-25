import { Outlet } from "react-router-dom";
import POEmpHeader from "./POEmpHeader";
import POEmpSideBar from "./POEmpSideBar";

export default function PostOfficeEmployeePage() {
  return (
    <>
      <div className="bg-gray-50 antialiased dark:bg-gray-900">
        {/* Header */}
        <POEmpHeader />

        {/* Sidebar */}
        <POEmpSideBar />

        <main className="min-h-screen bg-[#F6F6F8] p-4 pt-20 dark:bg-gray-900 xl:ml-64">
          {/* <Table /> */}
          <div id="detail">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
