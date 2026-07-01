import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "../../providers/AuthProvider.tsx";
import { NavLink } from "react-router-dom";
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
    driver: {
        id: number;
        name: string;
    } | null;
    vehicle: {
        id: number;
        registrationNumber: string;
    } | null;
    trailer: {
        id: number;
        registrationNumber: string;
    } | null;
    photoUrl: string | null;
    createdAt: string;
}

type DocumentType = "DRIVER" | "VEHICLE" | "GENERAL";

export default function Documents() {

    const { authFetch } = useAuth();

    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);

    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const [error, setError] = useState<string | null>(null);

    const [type, setType] = useState<DocumentType>("GENERAL");
    const [driverId, setDriverId] = useState<string>("");
    const [vehicleRegistration, setVehicleRegistration] = useState<string>("");

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [validTo, setValidTo] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);

    console.log(documents);

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

    // ---------------- ADD DOCUMENT ----------------

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {

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

            const formData = new FormData();
            formData.append("type", type);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("validTo", validTo);
            if (type === "DRIVER") formData.append("driver", driverId);
            if (type === "VEHICLE") formData.append("vehicleRegistration", vehicleRegistration.toUpperCase());
            if (photo) formData.append("photo", photo);

            const res = await authFetch("/api/document", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error();

            setTitle("");
            setDescription("");
            setDriverId("");
            setVehicleRegistration("");
            setValidTo("");
            setPhoto(null);

            await fetchDocuments();

        } catch {

            setError("Nie udało się dodać dokumentu.");

        } finally {

            setLoading(false);

        }
    };

    // ---------------- DELETE ----------------

    const handleDelete = async (id: number) => {

        if (confirmDeleteId !== id) {

            setConfirmDeleteId(id);
            return;

        }

        setDeletingId(id);

        try {

            const res = await authFetch(`/api/document/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error();

            await fetchDocuments();

            setConfirmDeleteId(null);

        } catch {

            setError("Nie udało się usunąć dokumentu.");

        } finally {

            setDeletingId(null);

        }
    };

    // ---------------- STATUS ----------------

    const getStatusBadge = (date: string) => {

        const diff = dayjs(date)
            .startOf("day")
            .diff(dayjs().startOf("day"), "day");

        if (diff < 0) {

            return (
                <span className="badge badge-error">
                    Wygasło
                </span>
            );

        }

        if (diff <= 7) {

            return (
                <span className="badge badge-error">
                    Za {diff} dni
                </span>
            );

        }

        if (diff <= 30) {

            return (
                <span className="badge badge-warning">
                    Za {diff} dni
                </span>
            );

        }

        return (
            <span className="badge badge-success">
                Aktywne
            </span>
        );
    };

    return (

        <div className="max-w-5xl mx-auto">

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

                        <select
                            className="select select-bordered w-full"
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value as DocumentType)
                            }
                        >

                            <option value="GENERAL">Firma</option>
                            <option value="DRIVER">Kierowca</option>
                            <option value="VEHICLE">Pojazd</option>

                        </select>

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

                        {type === "VEHICLE" && (

                            <input
                                type="text"
                                placeholder="Numer rejestracyjny"
                                className="input input-bordered w-full"
                                value={vehicleRegistration}
                                onChange={(e) =>
                                    setVehicleRegistration(e.target.value)
                                }
                            />

                        )}

                        <input
                            type="text"
                            placeholder="Tytuł dokumentu"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                        <textarea
                            placeholder="Opis (opcjonalnie)"
                            className="textarea textarea-bordered w-full"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={validTo}
                            onChange={(e) =>
                                setValidTo(e.target.value)
                            }
                        />

                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="file-input file-input-bordered w-full"
                            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                        />

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
                                    <th>Dotyczy</th>
                                    <th>Ważne do</th>
                                    <th>Status</th>
                                    <th>Opis</th>
                                    <th>Dodano</th>
                                    <th>Zdjęcie</th>
                                    <th>Akcje</th>
                                </tr>
                                </thead>

                                <tbody>

                                {documents.map((doc) => (

                                    <tr key={doc.id}>

                                        <td>{doc.id}</td>

                                        <td className="font-semibold">
                                            {doc.title}
                                        </td>

                                        <td>
                                            {doc.vehicle ?  <NavLink
                                                    to={`/vehicle/${doc.vehicle.registrationNumber}`}
                                                    className="link link-primary"
                                            >{doc.vehicle.registrationNumber}</NavLink> : null}
                                            {doc.trailer ?  <NavLink
                                                to={`/trailer/${doc.trailer.id}`}
                                                className="link link-primary"
                                            >{doc.trailer.registrationNumber}</NavLink> : null}
                                            {doc.driver ?  <NavLink
                                                to={`/driver/${doc.driver.id}`}
                                                className="link link-primary"
                                            >{doc.driver.name}</NavLink> : null}
                                            {doc.type === 'GENERAL' ? 'firma' : null}
                                        </td>

                                        <td>
                                            {dayjs(doc.validTo).format("DD.MM.YYYY")}
                                        </td>

                                        <td>
                                            {getStatusBadge(doc.validTo)}
                                        </td>
                                        <td>
                                            {doc.description}
                                        </td>

                                        <td>
                                            {dayjs(doc.createdAt).format("DD.MM.YYYY")}
                                        </td>

                                        <td>
                                            {doc.photoUrl && (
                                                <a href={doc.photoUrl} target="_blank" rel="noreferrer">
                                                    <img
                                                        src={doc.photoUrl}
                                                        alt="dokument"
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                </a>
                                            )}
                                        </td>

                                        <td>

                                            <button
                                                className={`btn btn-xs ${
                                                    confirmDeleteId === doc.id
                                                        ? "btn-error"
                                                        : "btn-outline btn-error"
                                                }`}
                                                onClick={() => handleDelete(doc.id)}
                                                disabled={deletingId === doc.id}
                                            >

                                                {deletingId === doc.id ? (

                                                    <span className="loading loading-spinner loading-xs"></span>

                                                ) : confirmDeleteId === doc.id ? (

                                                    "Na pewno?"

                                                ) : (

                                                    "Usuń"

                                                )}

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