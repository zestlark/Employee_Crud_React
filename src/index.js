import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "./views/Home";
import AdminLogin from "./component/AdminLogin";
import EmployeeForm from "./component/EmployeeForm";
import Learning from "./component/Learning";
import { getAllEmployee, getEmployeeById } from "./model/employee.model";
import Employees from "./component/Employees";

const employeeRouter = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        loader: () => redirect("home"),
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "employee",
        element: <Employees />,
        loader: async () => await getAllEmployee(),
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "/addEmployee",
        element: <EmployeeForm />,
      },
      {
        path: "/editEmployee/:_id",
        element: <EmployeeForm />,
        loader: async ({ params }) => await getEmployeeById(params._id),
      },
      {
        path: "/learn",
        element: <Learning />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>page not found</h1>,
  },
];

const router = createBrowserRouter(employeeRouter);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
