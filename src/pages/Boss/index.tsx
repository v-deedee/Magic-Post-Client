import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./SideBar";

export default function BossPage() {
  return (
    <>
      <div className="bg-gray-50 antialiased dark:bg-gray-900">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <Sidebar />

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
