import {NavLink, Link, useNavigate} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider";
import UserMenu from "./menu/userMenu";
import GuestMenu from "./menu/guestMenu";

export default function Header(){

    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const closeDropdown = () => {
        const elem = document.activeElement;
        if(elem){
            elem?.blur();
        }
    };

    const onLogout = async () => {
        logout();
        navigate('/');
        closeDropdown();
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-xl">
                <div className="flex-1">
                    <NavLink to="/" className="btn btn-ghost text-xl">
                        Driverfy
                    </NavLink>
                </div>
                <div className="flex-none">
                    {user ? <UserMenu /> : <GuestMenu />}
                </div>
            </div>
        </>
    );
}