import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  RouterProvider,
  Routes,
  NavLink,
  createBrowserRouter,
  useNavigate,
  Route,
} from "react-router-dom";
import Landing from "../pages/Landing";
import HomePage from "../pages/home";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SingIn";
import NotLoggedIn from "../pages/NotLoggedIn";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/login",
      element: <SignInPage />,
    },
    {
      path: "/notlogged",
      element: <NotLoggedIn />,
    },
  ]);

  // return <RouterProvider router={router} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<PrivateRoute isLoggedIn={false} />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
