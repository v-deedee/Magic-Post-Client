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
import Departments from "./pages/Boss/Departments/Departments.tsx";
import Dashboard from "./pages/Boss/Dashboard/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <BossPage />,
    children: [
      {
        path: "boss/dashboard",
        element: <Dashboard />,
      },
      {
        path: "boss/departments",
        element: <Departments />,
      },
    ],
  },
  {
    path: "/manager",
    element: <ManagerPage />,
  },
  {
    path: "/employee",
    element: <EmployeePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
