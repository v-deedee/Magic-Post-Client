import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ThemeProvider from "./utils/ThemeContext.tsx";

import HomePage from "./App.tsx";
import ErrorPage from "./error-page.tsx";

import Customer from "./pages/Customer/index.tsx";
import PostageTracking from "./pages/Customer/PostageTracking.tsx";
import EstimatedFreight from "./pages/Customer/EstimatedFreight.tsx";
import NearestPostOffice from "./pages/Customer/NearestPostOffice.tsx";

import LoginPage, {
  action as loginAction,
} from "./pages/Authentication/LoginPage.tsx";

import BossPage from "./pages/Boss/index.tsx";
import Departments from "./pages/Boss/Departments/index.tsx";
import Managers from "./pages/Boss/Managers/index.tsx";

import ManagerPage from "./pages/Manager/index.tsx";
import Staffs from "./pages/Manager/Staffs/index.tsx";

// import { Provider } from "react-redux";
// import store from "./store/store.ts";
// import TestReduxPage from "./pages/TestReduxPage";
// import TestApiPage from "./pages/TestApiPage/index.tsx";

// import { loader as postageTrackingLoader } from "./pages/Customer/PostageTracking.tsx";
// import { loader as testAPILoader } from "./pages/TestApiPage/index.tsx";

import PostOfficeEmployeePage from "./pages/Employee/PostOfficeEmployee/index.tsx";
import CtPTransactions from "./pages/Employee/PostOfficeEmployee/CtPTransactions/index.tsx";
import PtSTransactions from "./pages/Employee/PostOfficeEmployee/PtSTransactions/index.tsx";
import StPTransactions from "./pages/Employee/PostOfficeEmployee/StPTransactions/index.tsx";
import ToShip from "./pages/Employee/PostOfficeEmployee/ToShip/index.tsx";

import StorageEmployeePage from "./pages/Employee/StorageEmployee/index.tsx";
import StoragePtSTransactions from "./pages/Employee/StorageEmployee/PtSTransactions/index.tsx";
import StorageStPTransactions from "./pages/Employee/StorageEmployee/StPTransactions/index.tsx";
import SendStSTransactions from "./pages/Employee/StorageEmployee/SendStSTransactions/index.tsx";
import ReceiveStSTransactions from "./pages/Employee/StorageEmployee/ReceiveStSTransactions/index.tsx";

import PrintPage from "./pages/PrintPage/index.tsx";

import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/customer",
    element: <Customer />,
    children: [
      {
        path: "postage-tracking",
        // loader: postageTrackingLoader,
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
    path: "/login",
    action: loginAction,
    element: <LoginPage />,
  },
  {
    path: "boss",
    element: <BossPage />,
    children: [
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
        path: "ctp-transactions",
        element: <CtPTransactions />,
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
  // {
  //   path: "/testredux",
  //   element: <TestReduxPage />,
  // },
  // {
  //   path: "/testapi",
  //   loader: testAPILoader,
  //   element: <TestApiPage />,
  // },

  {
    path: "/print",
    element: <PrintPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* <Provider store={store}> */}
      <RouterProvider router={router} />
      {/* </Provider> */}
    </ThemeProvider>
  </React.StrictMode>,
);
