import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "../../providers/AuthProvider.tsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Driver {
    id: number;
    name: string;
}

interface DriverLicense {
    id: number;
    driver: {
        id: number;
        first_name: string;
        last_name: string;
    };
    blankiet_number: string;
    status: string;
    valid_until: string;
    created_at: string;
    last_checked_at: string;
}

export default function DriverLicense() {
    const { authFetch } = useAuth();

    const [licenses, setLicenses] = useState<DriverLicense[]>([]);
    const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);

    const [selectedDriver, setSelectedDriver] = useState<number | "">("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const [blankietNumber, setBlankietNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLicenses = async (): Promise<void> => {
        const res = await authFetch("/api/driver-license");
        const data: DriverLicense[] = await res.json();
        setLicenses(data);
    };

    const fetchUnplacedDrivers = async (): Promise<void> => {
        const res = await authFetch("/api/driver-license/driver-unplaced");
        const data: Driver[] = await res.json();
        setAvailableDrivers(data);
    };

    useEffect(() => {
        fetchLicenses();
        fetchUnplacedDrivers();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);


        if (!blankietNumber) return;

        if (!selectedDriver && (!firstName || !lastName)) return;

        setLoading(true);

        const payload = selectedDriver
            ? {
                driver_id: selectedDriver,
                blankiet: blankietNumber,
            }
            : {
                firstName,
                lastName,
                blankiet: blankietNumber,
            };

        try {
            const response = await authFetch("/api/driver-license/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            // reset
            setSelectedDriver("");
            setFirstName("");
            setLastName("");
            setBlankietNumber("");

            await fetchLicenses();
            await fetchUnplacedDrivers();
        }catch (err) {
            setError(
                "Nie udało się zweryfikować prawa jazdy. Sprawdź dane i spróbuj ponownie."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleManualInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        if (selectedDriver) {
            setSelectedDriver("");
        }

        if (name === "firstName") {
            setFirstName(value);
        }

        if (name === "lastName") {
            setLastName(value);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "VALID":
                return <span className="badge badge-success">Aktywne</span>;
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
        <div className="max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold mb-2">
                Monitorowanie praw jazdy
            </h1>

            <p className="text-base-content/60 mb-8">
                Dodaj kierowców do systemu monitorowania ważności prawa jazdy.
            </p>

            {/* FORM */}
            <div className="card bg-base-100 shadow mb-10">
                <div className="card-body">

                    <h2 className="card-title">
                        Dodaj do monitorowania
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* SELECT */}
                        <div>
                            <label className="label">
                                <span className="label-text">
                                    Wybierz kierowcę z listy
                                </span>
                            </label>

                            <select
                                className="select select-bordered w-full"
                                value={selectedDriver}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const value = e.target.value;
                                    const driverId = value ? Number(value) : "";
                                    setSelectedDriver(driverId);

                                    if (driverId !== null) {
                                        setFirstName("");
                                        setLastName("");
                                    }
                                }}
                            >
                                <option value="">-- Wybierz --</option>
                                {availableDrivers.map((driver) => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* OR */}
                        <div className="divider text-base-content/50">
                            LUB
                        </div>

                        {/* MANUAL INPUT */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Imię"
                                name="firstName"
                                className="input input-bordered w-full"
                                value={firstName}
                                onChange={handleManualInputChange}
                            />

                            <input
                                type="text"
                                placeholder="Nazwisko"
                                name="lastName"
                                className="input input-bordered w-full"
                                value={lastName}
                                onChange={handleManualInputChange}
                            />
                        </div>

                        {/* BLANKIET */}
                        <div>
                            <input
                                type="text"
                                placeholder="Numer blankiety"
                                className="input input-bordered w-full"
                                value={blankietNumber}
                                onChange={(e) =>
                                    setBlankietNumber(e.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="loading loading-spinner loading-sm mr-2"></span>
                            )}
                            {loading ? "Dodawanie..." : "Dodaj"}
                        </button>

                        {error && (
                            <div className="alert alert-error mt-4 text-sm">
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
                        Monitorowane prawa jazdy
                    </h2>

                    {licenses.length === 0 ? (
                        <p className="text-base-content/60 mt-4">
                            Brak monitorowanych praw jazdy.
                        </p>
                    ) : (
                        <div className="overflow-x-auto mt-4">
                            <table className="table table-zebra">
                                <thead>
                                <tr>
                                    <th>Kierowca</th>
                                    <th>Numer blankiety</th>
                                    <th>Data ważności</th>
                                    <th>Status</th>
                                    <th>Ostatnia aktualizacja</th>
                                </tr>
                                </thead>
                                <tbody>
                                {licenses.map((license) => (
                                    <tr key={license.id}>
                                        <td className="font-semibold">
                                            {license.driver.first_name}{" "}
                                            {license.driver.last_name}
                                        </td>
                                        <td>
                                            {license.blankiet_number}
                                        </td>
                                        <td>
                                            {license.valid_until
                                                ? dayjs
                                                    .utc(license.valid_until)
                                                    .local()
                                                    .format("DD.MM.YYYY")
                                                : "-"}
                                        </td>
                                        <td>
                                            {getStatusBadge(
                                                license.status
                                            )}
                                        </td>
                                        <td>
                                            {license.last_checked_at
                                                ? dayjs
                                                    .utc(license.last_checked_at)
                                                    .local()
                                                    .format("DD.MM.YYYY HH:mm")
                                                : "-"}
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