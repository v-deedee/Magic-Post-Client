import { Outlet } from "react-router-dom";
import ManagerHeader from "./ManagerHeader";
import ManagerSideBar from "./ManagerSideBar";

export default function ManagerPage() {
  return (
    <>
      <div className="bg-gray-50 antialiased dark:bg-gray-900">
        {/* Header */}
        <ManagerHeader />

        {/* Sidebar */}
        <ManagerSideBar />

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
