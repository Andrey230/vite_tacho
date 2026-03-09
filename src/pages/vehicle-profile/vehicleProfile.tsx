import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import dayjs from "dayjs";

interface DocumentItem {
    id: number;
    title: string;
    validTo: string;
    type: string;
}

interface Vehicle {
    id: number;
    registrationNumber: string;
    user: string;
    createdAt: string;
    mileage: number | null;
    documents: DocumentItem[];
}

export default function VehicleProfile() {
    const { authFetch } = useAuth();
    const { number } = useParams();

    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);

    const [docTitle, setDocTitle] = useState("");
    const [docValidTo, setDocValidTo] = useState("");

    const [documentError, setDocumentError] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const fetchVehicle = async () => {
        try {
            const res = await authFetch(`/api/vehicle/${number}`);

            if (!res.ok) {
                throw new Error();
            }

            const data = await res.json();
            setVehicle(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicle();
    }, [number]);

    const handleDeleteDocument = async (docId: number) => {

        if (confirmDeleteId !== docId) {
            setConfirmDeleteId(docId);
            return;
        }

        try {

            const res = await authFetch(`/api/document/${docId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error();
            }

            setConfirmDeleteId(null);

            await fetchVehicle();

        } catch (e) {

            console.error(e);

        }

    };

    const handleDocumentSubmit = async () => {
        setDocumentError(null);

        if(!vehicle){
            return;
        }

        if (!docTitle || !docValidTo) {
            setDocumentError("Uzupełnij wszystkie pola.");
            return;
        }

        if (dayjs(docValidTo).isBefore(dayjs(), "day")) {
            setDocumentError("Data ważności nie może być wcześniejsza niż dzisiejsza.");
            return;
        }

        try {
            const res = await authFetch(`/api/document`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "VEHICLE",
                    title: docTitle,
                    validTo: docValidTo,
                    vehicle: vehicle.id,
                }),
            });

            if (!res.ok) {
                throw new Error();
            }

            setDocTitle("");
            setDocValidTo("");

            await fetchVehicle();
        } catch (e) {
            console.error(e);
            setDocumentError("Nie udało się dodać dokumentu.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!vehicle) {
        return <p>Pojazd nie został znaleziony.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* HEADER */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h1 className="text-3xl font-bold">
                        {vehicle.registrationNumber}
                    </h1>

                    <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
                        <div>
                            <span className="text-base-content/60">
                                Dodano
                            </span>
                            <div className="font-semibold">
                                {dayjs(vehicle.createdAt).format("DD.MM.YYYY")}
                            </div>
                        </div>

                        <div>
                            <span className="text-base-content/60">
                                Przebieg
                            </span>
                            <div className="font-semibold">
                                {vehicle.mileage ?? "0"} km
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DOCUMENTS */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="card-title">
                        Dokumenty
                    </h2>

                    <div className="bg-base-200 rounded-xl p-4 mt-4">
                        <div className="grid md:grid-cols-3 gap-3">
                            <input
                                type="text"
                                placeholder="Tytuł dokumentu"
                                className="input input-bordered w-full"
                                value={docTitle}
                                onChange={(e) => setDocTitle(e.target.value)}
                            />

                            <input
                                type="date"
                                className="input input-bordered w-full"
                                value={docValidTo}
                                onChange={(e) => setDocValidTo(e.target.value)}
                            />

                            <button
                                className="btn btn-primary"
                                onClick={handleDocumentSubmit}
                            >
                                Dodaj dokument
                            </button>
                        </div>

                        {documentError && (
                            <p className="text-error text-sm mt-2">
                                {documentError}
                            </p>
                        )}
                    </div>

                    <div className="divider"></div>

                    <h3 className="font-semibold mt-8">
                        Lista dokumentów
                    </h3>

                    {vehicle.documents.length === 0 ? (
                        <p className="text-base-content/60 mt-3">
                            Brak dokumentów.
                        </p>
                    ) : (
                        <div className="overflow-x-auto mt-3">
                            <table className="table table-zebra">
                                <thead>
                                <tr>
                                    <th>Tytuł</th>
                                    <th>Ważne do</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {vehicle.documents.map((doc) => {
                                    const diff = dayjs(doc.validTo).diff(dayjs(), "day");

                                    let badge;

                                    if (diff < 0) {
                                        badge = <span className="badge badge-error">Wygasło</span>;
                                    } else if (diff <= 7) {
                                        badge = <span className="badge badge-error">Za {diff} dni</span>;
                                    } else if (diff <= 30) {
                                        badge = <span className="badge badge-warning">Za {diff} dni</span>;
                                    } else {
                                        badge = <span className="badge badge-success">Aktywne</span>;
                                    }

                                    return (
                                        <tr key={doc.id}>
                                            <td className="font-semibold">
                                                {doc.title}
                                            </td>

                                            <td>
                                                {dayjs(doc.validTo).format("DD.MM.YYYY")}
                                            </td>

                                            <td>
                                                {badge}
                                            </td>
                                            <td className="text-right">

                                                <button
                                                    className={`btn btn-xs btn-error`}
                                                    onClick={() => handleDeleteDocument(doc.id)}
                                                >
                                                    {confirmDeleteId === doc.id ? "Na pewno?" : "Usuń"}
                                                </button>

                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* NOTES */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="card-title">
                        Notatki
                    </h2>

                    <div className="flex gap-3 mt-4">
                        <textarea
                            className="textarea textarea-bordered flex-1"
                            placeholder="Dodaj notatkę o pojeździe..."
                        />

                        <button className="btn btn-primary h-fit">
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}