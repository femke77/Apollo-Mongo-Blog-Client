import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthGuard from "./components/AuthGuard.js";
import App from "./App.jsx";
import Home from "./pages/Home";
import Blog from "./pages/SingleBlog";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Error from "./pages/Error.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/blog/:blogId",
        element: <Blog />,
      },
      {
        path: "/profile",
        element: <AuthGuard><Profile /></AuthGuard>,
      },
      {
        path: "/edit-blog/:blogId",
        element: <AuthGuard><Edit /></AuthGuard>,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
