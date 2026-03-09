import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import dayjs from "dayjs";

interface Driver {
    id: number;
    name: string;
    carNumber: string | null;
    cardId: string | null;
    licenceNumber: string | null;
    documents: DocumentItem[];
    driverLicense: {
        id: number;
        blankiet_number: string;
        status: string;
        last_checked_at: string;
    } | null
}

interface DocumentItem {
    id: number;
    title: string;
    validTo: string;
    type: string;
}

export default function DriverProfile() {

    const { authFetch } = useAuth();
    const { id } = useParams();

    const [driver, setDriver] = useState<Driver | null>(null);
    const [loading, setLoading] = useState(true);

    const [blankietNumber, setBlankietNumber] = useState("");
    const [docTitle, setDocTitle] = useState("");
    const [docValidTo, setDocValidTo] = useState("");

    const [licenseError, setLicenseError] = useState<string | null>(null);
    const [documentError, setDocumentError] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const fetchDriver = async () => {

        try {

            const driverRes = await authFetch(`/api/driver-detail/${id}`);

            if (!driverRes.ok) throw new Error();

            const driverData = await driverRes.json();

            setDriver(driverData);

        } catch (e) {

            console.error(e);

        } finally {

            setLoading(false);

        }

    };

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

            await fetchDriver();

        } catch (e) {

            console.error(e);

        }

    };

    useEffect(() => {

        fetchDriver();

    }, [id]);

    const handleLicenseSubmit = async () => {

        setLicenseError(null);

        if (!blankietNumber) {
            setLicenseError("Podaj numer blankiety.");
            return;
        }

        try {

            const res = await authFetch(`/api/driver-license/validate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    driver_id: id,
                    blankiet: blankietNumber
                })
            });

            if (!res.ok) {
                throw new Error();
            }

            setBlankietNumber("");

            await fetchDriver();

        } catch (e) {

            console.error(e);
            setLicenseError("Nie udało się dodać prawa jazdy.");

        }

    };

    const handleDocumentSubmit = async () => {

        setDocumentError(null);

        if (!docTitle || !docValidTo) {
            setDocumentError("Uzupełnij wszystkie pola.");
            return;
        }

        try {

            const res = await authFetch(`/api/document`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "DRIVER",
                    title: docTitle,
                    validTo: docValidTo,
                    driver: id
                })
            });

            if (!res.ok) {
                throw new Error();
            }

            setDocTitle("");
            setDocValidTo("");

            await fetchDriver();

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

    if (!driver) {
        return <p>Driver not found</p>;
    }

    const getLicenseStatusBadge = (status: string) => {

        switch (status) {

            case "VALID":
                return <span className="badge badge-success">Ważne</span>;

            case "EXPIRED":
                return <span className="badge badge-error">Wygasło</span>;

            case "REVOKED":
                return <span className="badge badge-error">Cofnięte</span>;

            case "SUSPENDED":
                return <span className="badge badge-warning">Zawieszone</span>;

            case "INVALID":
                return <span className="badge badge-error">Nieprawidłowe</span>;

            case "NOT_FOUND":
                return <span className="badge badge-ghost">Nie znaleziono</span>;

            default:
                return <span className="badge badge-neutral">Nieznany</span>;
        }

    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* HEADER */}

            <div className="card bg-base-100 shadow">
                <div className="card-body">

                    <div className="flex justify-between items-start">

                        <h1 className="text-3xl font-bold">
                            {driver.name}
                        </h1>

                        <div className="flex gap-2">

                            <NavLink
                                to={`/driver/${driver.id}`}
                                className="btn btn-outline btn-sm"
                            >
                                Aktywność
                            </NavLink>

                            <NavLink
                                to={`/driver/statistics/${driver.id}`}
                                className="btn btn-outline btn-sm"
                            >
                                Statystyka
                            </NavLink>

                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">

                        {driver.carNumber && (
                            <div>
                                <span className="text-base-content/60">
                                    Samochód:
                                </span>
                                <div className="font-semibold">
                                    {driver.carNumber}
                                </div>
                            </div>
                        )}

                        {driver.cardId && (
                            <div>
                                <span className="text-base-content/60">
                                    Karta kierowcy:
                                </span>
                                <div className="font-semibold">
                                    {driver.cardId}
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>

            {/* DRIVER LICENSE */}

            <div className="card bg-base-100 shadow">
                <div className="card-body">

                    <h2 className="card-title">
                        Prawo jazdy
                    </h2>

                    <p className="text-base-content/60 text-sm">
                        Status prawa jazdy kierowcy na podstawie danych z systemu weryfikacji.
                    </p>

                    {!driver.driverLicense ? (

                        <div className="mt-6 max-w-xl">

                            <label className="text-sm text-base-content/60">
                                Numer blankiety
                            </label>

                            <div className="flex gap-3 mt-1">

                                <input
                                    type="text"
                                    placeholder="Np. BA759847"
                                    className="input input-bordered flex-1"
                                    value={blankietNumber}
                                    onChange={(e) => setBlankietNumber(e.target.value)}
                                />

                                <button
                                    className="btn btn-primary whitespace-nowrap"
                                    onClick={handleLicenseSubmit}
                                >
                                    Dodaj
                                </button>

                            </div>

                            {licenseError && (
                                <p className="text-error text-sm mt-2">
                                    {licenseError}
                                </p>
                            )}

                        </div>

                    ) : (

                        <div className="mt-4 grid md:grid-cols-3 gap-4">

                            <div>
                                <span className="text-sm text-base-content/60">
                                    Numer blankiety
                                </span>
                                <div className="font-semibold">
                                    {driver.driverLicense.blankiet_number}
                                </div>
                            </div>

                            <div>
                                <span className="text-sm text-base-content/60">
                                    Status
                                </span>
                                <div className="mt-1">
                                    {getLicenseStatusBadge(driver.driverLicense.status)}
                                </div>
                            </div>

                            <div>
                                <span className="text-sm text-base-content/60">
                                    Ostatnia aktualizacja
                                </span>
                                <div className="mt-1">
                                    {driver.driverLicense.last_checked_at
                                        ? dayjs
                                            .utc(driver.driverLicense.last_checked_at)
                                            .local()
                                            .format("DD.MM.YYYY HH:mm")
                                        : "-"}
                                </div>
                            </div>

                        </div>

                    )}

                </div>
            </div>

            {/* DOCUMENTS */}

            <div className="card bg-base-100 shadow">

                <div className="card-body">

                    <h2 className="card-title">
                        Dokumenty i terminy
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

                    {driver.documents.length === 0 ? (

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

                                {driver.documents.map((doc) => {

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
                            placeholder="Dodaj notatkę o kierowcy..."
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