import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom"
import Root from "./pages/root";
import Home from "./pages/home";
import Login, {loader as loginLoader} from "./pages/login";
import Profile from "./pages/profile";
import View, {loader as driverLoader} from "./pages/driver/view";
import SignUp, {loader as signupLoader} from "./pages/sign-up";
import Create, {loader as driverCreateLoader} from "./pages/driver/create";
import {AuthProvider} from "./providers/AuthProvider";
import Statistics from "./pages/statistics/statistics";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
                //loader: homeLoader,
            },
            {
                path: "/driver/:driver_id",
                element: <View />,
                loader: driverLoader,
            },
            {
                path: "/login",
                element: <Login />,
                loader: loginLoader
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/statistics",
                element: <Statistics />
            },
            {
                path: "/sign-up",
                element: <SignUp />,
                loader: signupLoader,
            },
            {
                path: "/drivers/create",
                element: <Create />,
                loader: driverCreateLoader,
            },
            {
                path: "*",
                element: <Navigate to={"/"} replace={true} />
            },
        ],
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>,
)
