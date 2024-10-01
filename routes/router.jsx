import { createBrowserRouter } from "react-router-dom";

import NotFound from "../src/pages/NotFound";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
