import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Chat from "../Pages/Chat";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Chat />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
  
    ],
  },
]);

export default routes;
