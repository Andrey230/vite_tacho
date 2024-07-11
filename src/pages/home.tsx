import { NavLink } from "react-router-dom";
import {useAuth} from "../providers/AuthProvider";

export default function Home(){

    const {token} = useAuth();

    return (
        <>
            <p className="text-2xl mb-5"><span className="font-bold">Driverfy</span> - is a service for analyzing drivers based on their ddd files</p>
            {token ?
                <NavLink to="/profile" className="btn btn-primary">Profile</NavLink> :
                <NavLink to="/login" className="btn btn-primary">Login</NavLink>
            }
        </>
    );
}