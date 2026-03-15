import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import {Link} from "react-router-dom";

interface Trailer {
    id: number;
    registrationNumber: string;
    createdAt?: string;
}

export default function TrailerList() {

    const { authFetch } = useAuth();

    const [trailers, setTrailers] = useState<Trailer[]>([]);
    const [loading, setLoading] = useState(true);

    const [registrationNumber, setRegistrationNumber] = useState("");
    const [error, setError] = useState<string | null>(null);

    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const fetchTrailers = async () => {

        try {

            const res = await authFetch("/api/trailers");

            if (!res.ok) throw new Error();

            const data = await res.json();

            setTrailers(data);

        } catch (e) {

            console.error(e);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTrailers();

    }, []);

    const handleSubmit = async () => {

        setError(null);

        if (!registrationNumber.trim()) {
            setError("Podaj numer rejestracyjny.");
            return;
        }

        try {

            const res = await authFetch("/api/trailer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    registrationNumber
                })
            });

            if (!res.ok) throw new Error();

            setRegistrationNumber("");

            await fetchTrailers();

        } catch (e) {

            console.error(e);

            setError("Nie udało się dodać przyczepy.");

        }

    };

    const handleDelete = async (id: number) => {

        if (confirmDeleteId !== id) {
            setConfirmDeleteId(id);
            return;
        }

        try {

            const res = await authFetch(`/api/trailer/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error();

            setConfirmDeleteId(null);

            await fetchTrailers();

        } catch (e) {

            console.error(e);

        }

    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (

        <div className="max-w-6xl mx-auto space-y-8">

            {/* HEADER */}

            <div className="card bg-base-100 shadow">

                <div className="card-body">

                    <h1 className="text-3xl font-bold">
                        Przyczepy
                    </h1>

                    <p className="text-base-content/60">
                        Zarządzanie przyczepami w systemie.
                    </p>

                </div>

            </div>

            {/* ADD TRAILER */}

            <div className="card bg-base-100 shadow">

                <div className="card-body">

                    <h2 className="card-title">
                        Dodaj przyczepę
                    </h2>

                    <div className="flex gap-3 mt-4">

                        <input
                            type="text"
                            placeholder="Numer rejestracyjny"
                            className="input input-bordered flex-1"
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Dodaj
                        </button>

                    </div>

                    {error && (
                        <p className="text-error text-sm mt-2">
                            {error}
                        </p>
                    )}

                </div>

            </div>

            {/* TRAILERS LIST */}

            <div className="card bg-base-100 shadow">

                <div className="card-body">

                    <h2 className="card-title">
                        Lista przyczep
                    </h2>

                    {trailers.length === 0 ? (

                        <p className="text-base-content/60 mt-4">
                            Brak przyczep w systemie.
                        </p>

                    ) : (

                        <div className="overflow-x-auto mt-4">

                            <table className="table table-zebra">

                                <thead>
                                <tr>
                                    <th>Numer rejestracyjny</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>

                                {trailers.map((trailer) => (

                                    <tr key={trailer.id}>

                                        <td className="font-semibold">
                                            <Link to={`/trailer/${trailer.id}`} className="link link-primary">{trailer.registrationNumber}</Link>
                                        </td>

                                        <td className="text-right">

                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => handleDelete(trailer.id)}
                                            >
                                                {confirmDeleteId === trailer.id
                                                    ? "Na pewno?"
                                                    : "Usuń"}
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}