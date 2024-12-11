import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/index.jsx";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes} />
);