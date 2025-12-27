import {NavLink} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../providers/AuthProvider";

export default function ForgotPassword()
{
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const {resetPassword} = useAuth();

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await resetPassword({
                email: email,
            });

            setSuccess(true);
            setLoading(false);
        }catch (error){
            console.log(error);
            setError(true);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex justify-center mt-20">
                <div>
                    <div className="bg-base-100 p-8  pb-4 rounded-2xl shadow-xl">
                        <p className="text-2xl font-bold mb-5">Zresetuj haslo</p>
                        <form onSubmit={onSubmitForm}>
                            <label className="input flex items-center gap-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                     className="w-4 h-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                                </svg>
                                <input type="email" className="grow" placeholder="Email" value={email} required={true}
                                       onChange={onEmailChange}/>
                            </label>
                            <div className="mt-4 flex">
                                {loading ? <button className="btn btn-primary" disabled>
                                    <span className="loading loading-spinner loading-xs"></span>
                                    Processing...
                                </button> : <button className="btn btn-primary">Wyslij link</button>}
                            </div>
                            {success ?
                                <p className="text-success text-sm mt-2">Jeśli konto istnieje, otrzymasz wiadomość
                                    e-mail.</p> : ""}
                            {error ? <p className="text-error text-sm mt-2">Coś poszło nie tak</p> : ""}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}