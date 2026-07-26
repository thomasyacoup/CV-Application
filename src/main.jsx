import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { ResumeProvider } from "./context/ResumeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResumeProvider>
      <RouterProvider router={router} />
    </ResumeProvider>
  </StrictMode>
);
