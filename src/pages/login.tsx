import {useEffect, useState} from "react";
import {useAuth} from "../providers/AuthProvider";
import { NavLink, useNavigate, redirect } from "react-router-dom";


export async function loader({ params }) {
    if(localStorage.getItem('token')){
        return redirect('/profile');
    }

    return {}
}

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const {login} = useAuth();

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            await login({
                email: email,
                password: password
            });
            navigate('/');

        }catch (error){
            console.log(error);
            setError(true);
        }
    }



        return (
        <>
            <div className="flex justify-center mt-20">
                <div>
                    <div className="bg-base-100 p-8  pb-4 rounded-2xl shadow-xl">
                        <p className="text-2xl font-bold mb-5">Login</p>
                        <form onSubmit={onSubmitForm}>
                            <label className="input flex items-center gap-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="email" className="grow" placeholder="Email" value={email} onChange={onEmailChange}/>
                            </label>
                            <label className="input flex items-center gap-2 bg-base-200 mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" className="grow" value={password} placeholder="*********" onChange={onPasswordChange} />
                            </label>
                            <p className="text-primary text-sm mt-2">Zapomniałeś/aś hasła?</p>
                            <button className="btn btn-primary mt-5">Zaloguj się</button>
                            {error ? <p className="text-error text-sm mt-2">Coś poszło nie tak</p> : ""}
                            <NavLink to="/sign-up" className="block text-sm text-primary mt-3 text-right">Utwórz nowe konto</NavLink>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}