import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./routers/Home";
import App from "./routers/App";

export const router = createBrowserRouter([
  {
      path: "/",
      element: <Navigate to="/home" replace />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/app",
    element: <App />
  }
])