import { redirect, useNavigate, NavLink } from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../providers/AuthProvider";


export async function loader({ params }) {
    if(localStorage.getItem('token')){
        return redirect('/profile');
    }

    return {}
}

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [startWork, setStartWork] = useState("16:30");
    const [endWork, setEndWork] = useState("06:30");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const {signUp} = useAuth();

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            await signUp({
                email: email,
                password: password,
                name: name,
                fullDayStart: convertTimeToMinutes(startWork),
                fullDayEnd: convertTimeToMinutes(endWork),
            });
            navigate('/profile');
        }catch (error){
            setError(true);
        }
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onStartWorkDayChange = (e) => {
        console.log(convertTimeToMinutes(e.target.value));
        setStartWork(e.target.value);
    }

    const onEndWorkDayChange = (e) => {
        console.log(convertTimeToMinutes(e.target.value));
        setEndWork(e.target.value);
    }

    function convertTimeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return (hours * 60) + minutes;
    }

    return (
        <>
            <div className="flex justify-center mt-20">
                <div>
                    <div className="bg-base-100 p-8  pb-4 rounded-2xl shadow-xl">
                        <p className="text-2xl font-bold mb-5">Rejestracja</p>
                        <form onSubmit={onSubmitForm}>
                            <label className="input flex items-center gap-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="email" className="grow" placeholder="Email" value={email} onChange={onEmailChange}/>
                            </label>
                            <label className="input flex items-center gap-2 bg-base-200 mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                                <input type="text" className="grow" placeholder="Imię" value={name} onChange={onNameChange}/>
                            </label>
                            <label className="input flex items-center gap-2 bg-base-200 mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" className="grow" value={password} placeholder="*********" onChange={onPasswordChange} />
                            </label>


                            <label className="form-control w-full max-w-xs mt-2">
                                <div className="label">
                                    <span className="label-text">Początek dnia roboczego</span>
                                </div>
                                <label className="input flex items-center gap-2 bg-base-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                                    <input type="time" className="grow" onChange={onStartWorkDayChange} value={startWork} />
                                </label>
                            </label>

                            <label className="form-control w-full max-w-xs mt-2">
                                <div className="label">
                                    <span className="label-text">Koniec dnia roboczego</span>
                                </div>
                                <label className="input flex items-center gap-2 bg-base-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                                    <input type="time" className="grow" onChange={onEndWorkDayChange} value={endWork} />
                                </label>
                            </label>
                            <button className="btn btn-primary mt-5">Utwórz</button>
                            {error ? <p className="text-error text-sm mt-2">Coś poszło nie tak</p> : ""}
                            <NavLink to="/login" className="block text-sm text-primary mt-3 text-right">Masz już konto ? Zaloguj się</NavLink>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}