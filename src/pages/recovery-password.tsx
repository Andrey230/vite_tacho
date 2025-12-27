import {redirect, useLoaderData, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../providers/AuthProvider.tsx";

export async function loader({ params }) {
    return params.token;
}


export default function RecoveryPassword()
{
    const token = useLoaderData();

    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {recoveryPassword} = useAuth();

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }


    const onSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await recoveryPassword({
                password: password,
                token: token,
            });

            navigate('/');
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
                        <p className="text-2xl font-bold mb-5">Nowe haslo</p>
                        <form onSubmit={onSubmitForm}>
                            <label className="input flex items-center gap-2 bg-base-200 mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                     className="w-4 h-4 opacity-70">
                                    <path fillRule="evenodd"
                                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <input type="password" className="grow" value={password} placeholder="*********"
                                       onChange={onPasswordChange}/>
                            </label>
                            <div className="mt-4 flex">
                                {loading ? <button className="btn btn-primary" disabled>
                                    <span className="loading loading-spinner loading-xs"></span>
                                    Processing...
                                </button> : <button className="btn btn-primary">Zresetuj</button>}
                            </div>
                            {error ? <p className="text-error text-sm mt-2">Coś poszło nie tak</p> : ""}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}