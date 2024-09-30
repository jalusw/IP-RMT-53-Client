import { createBrowserRouter } from "react-router-dom";

import NotFound from "../src/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
