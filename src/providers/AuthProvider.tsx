import {createContext, useContext, useEffect, useState} from "react";
import { redirect } from "react-router-dom";
import {useNotification} from "../pages/root";
import {NotificationTypes} from "../constants/NotificationTypes";

const baseUrl = import.meta.env.VITE_ENDPOINT_BACKEND;

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<null|object>(null);
    const [token, setToken] = useState<null|string>(localStorage.getItem('token'));

    useEffect(() => {
        if(token){
            getUserInfo(token).then((data) => setUser(data));
        }else{
            setUser(null);
        }
    }, [token]);

    const login = async (credentials) => {
        try {
            const response = await fetch(baseUrl + "/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(credentials)
            });

            if(!response.ok){
                throw new Error('Login failed');
            }

            const data = await response.json();

            setToken(data.token);
            localStorage.setItem('token', data.token);
            return true;
        } catch (error) {
            throw error;
        }
    }

    const signUp = async (credentials) => {
        try {
            const response = await fetch("/api/users/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if(!response.ok){
                throw new Error('Signup failed');
            }

            const data = await response.json();

            await login(credentials);
            return true;
        } catch (error) {
            throw error;
        }
    }

    const uploadDriver = async (credentials) => {
        try {
            const response = await fetch("/api/driver/upload", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify(credentials)
            });

            if(!response.ok){
                throw new Error('createDriver failed');
            }

            const data = await response.json();
            const userData = await getUserInfo(token);
            setUser(userData);
            return data;
        } catch (error) {
            throw error;
        }
    }

    const uploadDriverFile = async (driver) => {
        try {
            const response = await fetch(`/api/drivers/${driver}/upload`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            });

            if(!response.ok){
                throw new Error('createDriver failed');
            }


            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    const getActivitiesByMonth = async (month) => {
        try {
            const response = await fetch("/api/users/month/" + month, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            });

            if(!response.ok){
                throw new Error('drivers-activity failed');
            }

            return await response.json();
        } catch (error) {
            console.log(error.message);
        }
    }

    const getUserInfo = async (token) => {
        try {
            const response = await fetch("/api/user", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            });

            if(!response.ok){
                throw new Error('User info failed');
            }

            return await response.json();
        } catch (error) {
            logout();
            window.location.replace("/login");
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, token, logout, signUp, uploadDriver, uploadDriverFile, getActivitiesByMonth }}>
            {children}
        </AuthContext.Provider>
    );
}