import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "../../providers/AuthProvider.tsx";
import dayjs from "dayjs";

interface Driver {
    id: number;
    name: string;
}

interface DocumentItem {
    id: number;
    type: "DRIVER" | "VEHICLE" | "GENERAL";
    title: string;
    description: string | null;
    validTo: string;
    driver: number | null;
    vehicleRegistration: string | null;
    createdAt: string;
}

type DocumentType = "DRIVER" | "VEHICLE" | "GENERAL";

export default function Documents() {
    const { authFetch } = useAuth();

    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [type, setType] = useState<DocumentType>("GENERAL");
    const [driverId, setDriverId] = useState<string>("");
    const [vehicleRegistration, setVehicleRegistration] =
        useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [validTo, setValidTo] = useState<string>("");

    // ---------------- FETCH DOCUMENTS ----------------

    const fetchDocuments = async (): Promise<void> => {
        try {
            const res = await authFetch("/api/documents");
            if (!res.ok) throw new Error();
            const data: DocumentItem[] = await res.json();
            setDocuments(data);
        } catch {
            setError("Nie udało się pobrać dokumentów.");
        }
    };

    // ---------------- FETCH DRIVERS ----------------

    const fetchDrivers = async (): Promise<void> => {
        try {
            const res = await authFetch("/api/drivers");
            if (!res.ok) throw new Error();
            const data: Driver[] = await res.json();
            setDrivers(data);
        } catch {
            setError("Nie udało się pobrać kierowców.");
        }
    };

    useEffect(() => {
        fetchDocuments();
        fetchDrivers();
    }, []);

    // ---------------- SUBMIT ----------------

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setError(null);

        if (!title || !validTo) {
            setError("Uzupełnij wymagane pola.");
            return;
        }

        if (dayjs(validTo).isBefore(dayjs(), "day")) {
            setError("Data ważności nie może być wcześniejsza niż dzisiejsza.");
            return;
        }

        if (type === "DRIVER" && !driverId) {
            setError("Wybierz kierowcę.");
            return;
        }

        if (type === "VEHICLE" && !vehicleRegistration) {
            setError("Podaj numer rejestracyjny.");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                type,
                title,
                description,
                validTo,
                driver: type === "DRIVER" ? Number(driverId) : null,
                vehicleRegistration:
                    type === "VEHICLE"
                        ? vehicleRegistration.toUpperCase()
                        : null,
            };

            const res = await authFetch("/api/document", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error();

            // reset
            setTitle("");
            setDescription("");
            setDriverId("");
            setVehicleRegistration("");
            setValidTo("");

            await fetchDocuments();
        } catch {
            setError("Nie udało się dodać dokumentu.");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- STATUS ----------------

    const getStatusBadge = (date: string) => {
        const diff = dayjs(date).diff(dayjs(), "day");

        if (diff < 0) {
            return <span className="badge badge-error">Wygasło</span>;
        }

        if (diff <= 30) {
            return (
                <span className="badge badge-warning">
                    Wygasa wkrótce
                </span>
            );
        }

        return <span className="badge badge-success">Aktywne</span>;
    };

    return (
        <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <h1 className="text-3xl font-bold mb-2">
                Dokumenty i terminy
            </h1>

            <p className="text-base-content/60 mb-8">
                Monitoruj ważność dokumentów kierowców, pojazdów
                oraz dokumentów firmowych.
            </p>

            {/* FORM */}
            <div className="card bg-base-100 shadow mb-10">
                <div className="card-body">
                    <h2 className="card-title">
                        Dodaj dokument
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 mt-4"
                    >
                        {/* TYPE */}
                        <select
                            className="select select-bordered w-full"
                            value={type}
                            onChange={(e) =>
                                setType(
                                    e.target.value as DocumentType
                                )
                            }
                        >
                            <option value="GENERAL">Firma</option>
                            <option value="DRIVER">Kierowca</option>
                            <option value="VEHICLE">Pojazd</option>
                        </select>

                        {/* DRIVER SELECT */}
                        {type === "DRIVER" && (
                            <select
                                className="select select-bordered w-full"
                                value={driverId}
                                onChange={(e) =>
                                    setDriverId(e.target.value)
                                }
                            >
                                <option value="">
                                    -- Wybierz kierowcę --
                                </option>
                                {drivers.map((driver) => (
                                    <option
                                        key={driver.id}
                                        value={driver.id}
                                    >
                                        {driver.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* VEHICLE INPUT */}
                        {type === "VEHICLE" && (
                            <input
                                type="text"
                                placeholder="Numer rejestracyjny"
                                className="input input-bordered w-full"
                                value={vehicleRegistration}
                                onChange={(e) =>
                                    setVehicleRegistration(
                                        e.target.value
                                    )
                                }
                            />
                        )}

                        {/* TITLE */}
                        <input
                            type="text"
                            placeholder="Tytuł dokumentu"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                        {/* DESCRIPTION */}
                        <textarea
                            placeholder="Opis (opcjonalnie)"
                            className="textarea textarea-bordered w-full"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        {/* VALID TO */}
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={validTo}
                            onChange={(e) =>
                                setValidTo(e.target.value)
                            }
                        />

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="loading loading-spinner loading-sm mr-2"></span>
                            )}
                            {loading
                                ? "Dodawanie..."
                                : "Dodaj dokument"}
                        </button>

                        {error && (
                            <div className="alert alert-error mt-2 text-sm">
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* LIST */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="card-title">
                        Lista dokumentów
                    </h2>

                    {documents.length === 0 ? (
                        <p className="text-base-content/60 mt-4">
                            Brak dokumentów.
                        </p>
                    ) : (
                        <div className="overflow-x-auto mt-4">
                            <table className="table table-zebra">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tytuł</th>
                                    <th>Typ</th>
                                    <th>Dotyczy</th>
                                    <th>Ważne do</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {documents.map((doc) => (
                                    <tr key={doc.id}>
                                        <td>{doc.id}</td>
                                        <td className="font-semibold">
                                            {doc.title}
                                        </td>
                                        <td>{doc.type}</td>
                                        <td>
                                            {doc.driver
                                                ? `Driver #${doc.driver}`
                                                : doc.vehicleRegistration
                                                    ? doc.vehicleRegistration
                                                    : "Firma"}
                                        </td>
                                        <td>
                                            {dayjs(doc.validTo).format(
                                                "DD.MM.YYYY"
                                            )}
                                        </td>
                                        <td>
                                            {getStatusBadge(
                                                doc.validTo
                                            )}
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