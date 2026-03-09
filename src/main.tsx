import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom"
import Root from "./pages/root";
import Login from "./pages/login";
import Profile from "./pages/profile";
import View from "./pages/driver/view";
import SignUp from "./pages/sign-up";
// import Create, {loader as driverCreateLoader} from "./pages/driver/create";
import {AuthProvider} from "./providers/AuthProvider";
import Statistics from "./pages/statistics/statistics";
import Settings from "./pages/settings/settings";
import { Analytics } from "@vercel/analytics/react"
// import ForgotPassword from "./pages/forgot-password.tsx";
// import RecoveryPassword, {loader as recoveryPasswordLoader} from "./pages/recovery-password.tsx";
import Workdays from "./pages/statistics/workdays.tsx";
import Landing from "./pages/landing/landing.tsx";
import Rules from "./pages/rules/rules.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import RedirectIfAuth from "./components/RedirectIfAuth.tsx";
import DriverLicense from "./pages/driver-license/driverLicense.tsx";
import Documents from "./pages/documents/documents.tsx";
import DriverProfile from "./pages/driverProfile/driverProfile.tsx";
import VehicleProfile from "./pages/vehicle-profile/vehicleProfile.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            // 🔓 PUBLIC
            {
                element: <RedirectIfAuth />,
                children: [
                    { path: "/login", element: <Login /> },
                    { path: "/sign-up", element: <SignUp /> },
                ]
            },
            { path: "/landing", element: <Landing /> },
            {
                path: "/rules",
                element: <Rules />,
                //loader: homeLoader,
            },

            // 🔐 PROTECTED
            {
                element: <RequireAuth />,
                children: [
                    { path: "/", element: <Profile /> },
                    {
                        path: "/driver/statistics/:driver_id",
                        element: <Workdays />,
                    },
                    { path: "/statistics", element: <Statistics /> },
                    { path: "/settings", element: <Settings /> },
                    { path: "/driver/:driver_id", element: <View /> },
                    { path: "/driver-profile/:id", element: <DriverProfile /> },
                    { path: "/vehicle/:number", element: <VehicleProfile /> },
                    // {
                    //     path: "/driver/:driver_id",
                    //     element: <View />,
                    // },
                    { path: "/driver-license", element: <DriverLicense />},
                    {path: "/documents", element: <Documents />}
                ]
            },

            {
                path: "*",
                element: <Navigate to={"/"} replace={true} />
            }
        ],
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
          <Analytics />
          <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>,
)
