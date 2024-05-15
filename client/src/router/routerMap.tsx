import { Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import User from "@/pages/User";
import Editor from "@/pages/Editor";
import Book from "@/pages/Book";
import Layout from "@/layout";
import PrivateRoute from "./privateRoute";
export const routerMap = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/editor",
        element: <Editor />,
      },
      {
        path: "/book",
        element: <Book />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  }, //其他没有被注册过的路径统一重定位到login
];
