import { Outlet } from "react-router-dom";
import StorageEmpHeader from "./StorageEmpHeader";
import StorageEmpSideBar from "./StorageEmpSideBar";

export default function StorageEmployeePage() {
  return (
    <>
      <div className="bg-gray-50 antialiased dark:bg-gray-900">
        {/* Header */}
        <StorageEmpHeader />

        {/* Sidebar */}
        <StorageEmpSideBar />

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
