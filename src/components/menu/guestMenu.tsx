import {Link} from "react-router-dom";

export default function GuestMenu() {
    const closeDropdown = () => {
        const elem = document.activeElement;
        if(elem){
            elem?.blur();
        }
    };


    return (
        <>
            <ul className="menu menu-horizontal px-1">
                <li>
                    <Link to="/login" onClick={closeDropdown}>Zaloguj się</Link>
                </li>
            </ul>
        </>
    );
}