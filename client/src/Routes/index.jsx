import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Home, Requests } from "../Screens";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/requests",
        element: <Requests />,
      },
    ],
  },
]);
