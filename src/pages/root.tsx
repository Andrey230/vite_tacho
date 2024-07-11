import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Notifications from "../components/notifications";
import {createContext, useContext, useState} from "react";


const NotificationContext = createContext({});

export default function Root(){

    const [notifications, setNotifications] = useState([]);

    const addNotification = (message) => {
        setNotifications([message]);

        setTimeout(() => {
            setNotifications([]);
        }, 5000);
    };

    const clearNotification = () => {
        setNotifications([]);
    }

    const notificationContext = {
        notifications,
        addNotification,
        clearNotification
    };

    return (
        <>
            <NotificationContext.Provider value={notificationContext}>
                <Notifications />
                <Header />
                <div className="bg-base-300 pt-6 pb-8 min-h-screen flex justify-center">
                    <div className="container">
                        <Outlet />
                    </div>
                </div>
            </NotificationContext.Provider>
        </>
    );
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};