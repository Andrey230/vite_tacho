import {NavLink, Link, useNavigate} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider";

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
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {user ? <>
                                    <li>
                                        <Link to="/profile" onClick={closeDropdown}>Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/statistics" onClick={closeDropdown}>Statistics</Link>
                                    </li>
                                    <li>
                                        <a onClick={onLogout}>Logout</a>
                                    </li>
                                </> :
                                <>
                                    <li>
                                        <Link to="/sign-up" onClick={closeDropdown}>Create account</Link>
                                    </li>
                                    <li>
                                        <Link to="/login" onClick={closeDropdown}>Login</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}