import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";

export default function SignUp() {

    const navigate = useNavigate();
    const { signUp } = useAuth();

    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
        startWork: "16:30",
        endWork: "06:30"
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    function convertTimeToMinutes(time: string) {
        const [hours, minutes] = time.split(':').map(Number);
        return (hours * 60) + minutes;
    }

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await signUp({
                email: form.email,
                password: form.password,
                name: form.name,
                fullDayStart: convertTimeToMinutes(form.startWork),
                fullDayEnd: convertTimeToMinutes(form.endWork),
            });

            navigate("/profile");

        } catch (err) {
            setError("Nie udało się utworzyć konta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-center mt-20">
                <div>
                    <div className="bg-base-100 p-8 pb-4 rounded-2xl shadow-xl">
                        <p className="text-2xl font-bold mb-5">Rejestracja</p>

                        <form onSubmit={onSubmitForm}>

                            <label className="input flex items-center gap-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 16 16"
                                     fill="currentColor"
                                     className="w-4 h-4 opacity-70">
                                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                                </svg>
                                <input
                                    type="email"
                                    name="email"
                                    className="grow"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label className="input flex items-center gap-2 bg-base-200 mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512"
                                     fill="currentColor"
                                     className="w-4 h-4 opacity-70">
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                                </svg>
                                <input
                                    type="text"
                                    name="name"
                                    className="grow"
                                    placeholder="Imię"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label className="input flex items-center gap-2 bg-base-200 mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 16 16"
                                     fill="currentColor"
                                     className="w-4 h-4 opacity-70">
                                    <path fillRule="evenodd"
                                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <input
                                    type="password"
                                    name="password"
                                    className="grow"
                                    value={form.password}
                                    placeholder="*********"
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label className="label mt-2">
                                <input type="checkbox" className="checkbox" required />
                                <div className="ml-2 w-64 text-sm">
                                    Akceptuję <NavLink to="/rules" className="text-primary">Regulamin</NavLink> i wyrażam zgodę na przetwarzanie danych osobowych.
                                </div>
                            </label>

                            <button
                                className="btn btn-primary mt-5"
                                disabled={loading}
                            >
                                {loading ? "Tworzenie..." : "Utwórz"}
                            </button>

                            {error && (
                                <p className="text-error text-sm mt-2">
                                    {error}
                                </p>
                            )}

                            <NavLink
                                to="/login"
                                className="block text-sm text-primary mt-3 text-right"
                            >
                                Masz już konto? Zaloguj się
                            </NavLink>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}