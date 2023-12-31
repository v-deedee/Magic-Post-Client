import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page.tsx";
import BossPage from "./pages/Boss/index.tsx";
import ManagerPage from "./pages/Manager/index.tsx";
import ThemeProvider from "./utils/ThemeContext.tsx";
import Departments from "./pages/Boss/Departments/index.tsx";
import BossDashboard from "./pages/Boss/Dashboard/Dashboard.tsx";
import ManagerDashboard from "./pages/Manager/Dashboard/index.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import TestReduxPage from "./pages/TestReduxPage";
import TestApiPage from "./pages/TestApiPage/index.tsx";
import LoginPage from "./pages/Authentication/LoginPage.tsx";
import {
  action as loginAction,
  loader as loginLoader,
} from "./pages/Authentication/LoginPage.tsx";
import HomePage from "./App.tsx";
import Customer from "./pages/Customer/index.tsx";
import { PostageTracking } from "./pages/Customer/PostageTracking.tsx";
import { EstimatedFreight } from "./pages/Customer/EstimatedFreight.tsx";
import { NearestPostOffice } from "./pages/Customer/NearestPostOffice.tsx";
import { loader as postageTrackingLoader } from "./pages/Customer/PostageTracking.tsx";
import { loader as testAPILoader } from "./pages/TestApiPage/index.tsx";
import Managers from "./pages/Boss/Managers/index.tsx";
import Staffs from "./pages/Manager/Staffs/index.tsx";
import PostOfficeEmployeePage from "./pages/Employee/PostOfficeEmployee/index.tsx";
import StorageEmployeePage from "./pages/Employee/StorageEmployee/index.tsx";
import CtPTransactions from "./pages/Employee/PostOfficeEmployee/CtPTransactions/index.tsx";
import { action as actionPostOfficeEmployee } from "./pages/Employee/PostOfficeEmployee/CtPTransactions/index.tsx";
import Dashboard from "./pages/Employee/PostOfficeEmployee/Dashboard/index.tsx";
import PtSTransactions from "./pages/Employee/PostOfficeEmployee/PtSTransactions/index.tsx";
import StPTransactions from "./pages/Employee/PostOfficeEmployee/StPTransactions/index.tsx";
import { ToShip } from "./pages/Employee/PostOfficeEmployee/ToShip/index.tsx";
import { loader as postOfficeEmployeeLoader } from "./pages/Employee/PostOfficeEmployee/CtPTransactions/index.tsx";
import StoragePtSTransactions from "./pages/Employee/StorageEmployee/PtSTransactions/index.tsx";
import { StPTransactions as StorageStPTransactions } from "./pages/Employee/StorageEmployee/StPTransactions/index.tsx";
import SendStSTransactions from "./pages/Employee/StorageEmployee/SendStSTransactions/index.tsx";
import { ReceiveStSTransactions } from "./pages/Employee/StorageEmployee/ReceiveStSTransactions/index.tsx";
import PrintPage from "./pages/PrintPage/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "boss",
    element: <BossPage />,
    children: [
      {
        path: "dashboard",
        element: <BossDashboard />,
      },
      {
        path: "departments",
        element: <Departments />,
      },
      {
        path: "managers",
        element: <Managers />,
      },
    ],
  },
  {
    path: "manager",
    element: <ManagerPage />,
    children: [
      {
        path: "dashboard",
        element: <ManagerDashboard />,
      },
      {
        path: "staffs",
        element: <Staffs />,
      },
    ],
  },
  {
    path: "post-office-employee",
    element: <PostOfficeEmployeePage />,
    children: [
      {
        action: actionPostOfficeEmployee,
        loader: postOfficeEmployeeLoader,
        path: "ctp-transactions",
        element: <CtPTransactions />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "pts-transactions",
        element: <PtSTransactions />,
      },
      {
        path: "stp-transactions",
        element: <StPTransactions />,
      },
      {
        path: "to-ship",
        element: <ToShip />,
      },
    ],
  },
  {
    path: "storage-employee",
    element: <StorageEmployeePage />,
    children: [
      {
        path: "pts-transactions",
        element: <StoragePtSTransactions />,
      },
      {
        path: "send-sts-transactions",
        element: <SendStSTransactions />,
      },
      {
        path: "receive-sts-transactions",
        element: <ReceiveStSTransactions />,
      },
      {
        path: "stp-transactions",
        element: <StorageStPTransactions />,
      },
    ],
  },
  {
    path: "/testredux",
    element: <TestReduxPage />,
  },
  {
    path: "/testapi",
    loader: testAPILoader,
    element: <TestApiPage />,
  },
  {
    path: "/login",
    action: loginAction,
    loader: loginLoader,
    element: <LoginPage />,
  },
  {
    path: "/customer",
    element: <Customer />,
    children: [
      {
        path: "postage-tracking",
        loader: postageTrackingLoader,
        element: <PostageTracking />,
      },
      {
        path: "estimated-freight",
        element: <EstimatedFreight />,
      },
      {
        path: "nearest-post-office",
        element: <NearestPostOffice />,
      },
    ],
  },
  {
    path: "/print",
    element: <PrintPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
