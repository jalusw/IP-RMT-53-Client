import { createBrowserRouter, redirect } from "react-router-dom";

import NotFound from "../src/pages/NotFound";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import General from "../src/components/layouts/General";
import Workspace from "../src/pages/Workspace";
import WorkspaceEdit from "../src/pages/WorkspaceEdit";
import AuthGuard from "../src/components/guard/AuthGuard";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: (
      <General>
        <Home />
      </General>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/workspace",
    element: (
      <AuthGuard>
        <Workspace />,
      </AuthGuard>
    ),
  },
  {
    path: "/workspace/:id",
    element: (
      <AuthGuard>
        <WorkspaceEdit />,
      </AuthGuard>
    ),
  },
]);

export default router;
