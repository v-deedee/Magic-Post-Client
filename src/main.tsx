import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import ErrorPage from "./error-page.tsx";
import BossPage from "./pages/Boss/index.tsx";
import ManagerPage from "./pages/Manager/index.tsx";
import EmployeePage from "./pages/Employee/index.tsx";
import ThemeProvider from "./utils/ThemeContext.tsx";
import Departments from "./pages/Boss/Departments/index.tsx";
import Dashboard from "./pages/Boss/Dashboard/Dashboard.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import TestReduxPage from "./pages/TestReduxPage";
import TestApiPage from "./pages/TestApiPage/index.tsx";
import CreateNewTransaction from "./pages/Employee/CreateNewTransaction.tsx";
import LoginPage from "./pages/Authentication/LoginPage.tsx";
import {
  action as loginAction,
  loader as loginLoader,
} from "./pages/Authentication/LoginPage.tsx";
import HomePage from "./pages/HomePage/index.tsx";
import Customer from "./pages/Customer/index.tsx";
import { PostageTracking } from "./pages/Customer/PostageTracking.tsx";
import EstimatedFreight from "./pages/Customer/EstimatedFreight.tsx";
import { NearestPostOffice } from "./pages/Customer/NearestPostOffice.tsx";
import { loader as postageTrackingLoader } from "./pages/Customer/PostageTracking.tsx";
import Managers from "./pages/Boss/Managers/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "boss",
    element: <BossPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
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
    path: "/manager",
    element: <ManagerPage />,
  },
  {
    path: "employee",
    element: <EmployeePage />,
    children: [
      {
        path: "create-new-transaction",
        element: <CreateNewTransaction />,
      },
    ],
  },
  {
    path: "/testredux",
    element: <TestReduxPage />,
  },
  {
    path: "/testapi",
    element: <TestApiPage />,
  },
  {
    path: "/login",
    action: loginAction,
    loader: loginLoader,
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
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
