import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DriverList from "../components/driverList";

export default function Profile() {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token]);

    if (!user) return null;

    return (
        <>
            <p className="text-2xl font-bold">Witam, {user.name}</p>
            <div className="mt-8">
                <DriverList drivers={user.drivers} />
            </div>
        </>
    );
}