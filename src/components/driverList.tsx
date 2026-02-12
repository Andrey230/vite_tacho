import { useAuth } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DriverList({ drivers }) {
    const { uploadDriver } = useAuth();

    const [searchValue, setSearchValue] = useState("");
    const [filteredDrivers, setFilteredDrivers] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        setFilteredDrivers(drivers);
    }, [drivers]);

    const onUploadDriver = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setIsSuccess(false);
        setIsError(false);

        if (!file.name.endsWith(".ddd")) {
            setIsError(true);
            return;
        }

        setIsUploading(true);

        const reader = new FileReader();

        reader.onload = async (event) => {
            const dataUrl = event.target.result;
            const content = dataUrl.split(",")[1];

            try {
                const result = await uploadDriver({
                    file: content,
                });

                if (result) {
                    setIsSuccess(true);
                }
            } catch (error) {
                setIsError(true);
            } finally {
                setIsUploading(false);
            }
        };

        reader.readAsDataURL(file);
    };

    const findDrivers = (event) => {
        const value = event.target.value.toLowerCase().replace(/\s+/g, "");
        setSearchValue(value);

        const newDrivers = drivers.filter(
            (driver) =>
                driver.name.toLowerCase().replace(/\s+/g, "").includes(value) ||
                driver.carNumber.toLowerCase().replace(/\s+/g, "").includes(value)
        );

        setFilteredDrivers(newDrivers);
    };

    return (
        <>
            {/* Upload Section */}
            <div className="card bg-base-200 border border-dashed border-primary/40 mb-8">
                <div className="card-body items-center text-center">

                    <h3 className="text-lg font-semibold">
                        Dodaj plik z tachografu (.ddd)
                    </h3>

                    <p className="text-base-content/70 max-w-md">
                        Załaduj plik w formacie <strong>.ddd</strong> pobrany z karty
                        kierowcy lub tachografu. System automatycznie przetworzy dane
                        i doda kierowcę do listy.
                    </p>

                    <label className="mt-4 cursor-pointer">
                        <input
                            type="file"
                            accept=".ddd"
                            className="hidden"
                            onChange={onUploadDriver}
                        />

                        <div className="btn btn-primary">
                            {isUploading ? "Przetwarzanie..." : "Wybierz plik"}
                        </div>
                    </label>

                    <p className="text-xs opacity-50 mt-3">
                        Obsługiwany format: .ddd
                    </p>

                    {isSuccess ? <div className="alert alert-success mt-6 max-w-md mx-auto shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>
                          Plik został poprawnie przetworzony.
                        </span>
                    </div> : ''}

                    {isError ? <div className="alert alert-error mt-6 max-w-md mx-auto shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>
                          Wystąpił błąd podczas przetwarzania pliku.
                        </span>
                    </div> : ''}
                </div>
            </div>

            {/* Table or Empty State */}
            {filteredDrivers.length > 0 ? (
                <>
                    {/* Driver Header */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="font-semibold text-2xl">Twoi kierowcy ({filteredDrivers.length})</p>
                    </div>

                    {/* Search */}
                    <label className="input input-bordered flex items-center gap-2 w-64 shadow mb-5">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Znajdź kierowcę"
                            value={searchValue}
                            onChange={findDrivers}
                        />
                    </label>
                    <div className="bg-base-100 shadow rounded-2xl p-5">
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Kierowca</th>
                                    <th>Numer samochodu</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredDrivers.map((driver) => (
                                    <tr key={driver.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img
                                                            src="https://static.vecteezy.com/system/resources/previews/026/175/074/original/driver-avatar-round-flat-icon-vector.jpg"
                                                            alt="driver"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {driver.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                      <span className="font-bold">
                        {driver.carNumber}
                      </span>
                                        </td>
                                        <td>
                                            <div className="flex gap-3">
                                                <NavLink
                                                    to={`/driver/${driver.id}`}
                                                    className="btn btn-primary btn-xs"
                                                >
                                                    aktywność
                                                </NavLink>
                                                <NavLink
                                                    to={`/driver/statistics/${driver.id}`}
                                                    className="btn btn-outline btn-xs"
                                                >
                                                    statystyka
                                                </NavLink>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-lg font-semibold">
                        Nie masz jeszcze kierowców
                    </p>
                    <p className="opacity-70">
                        Dodaj pierwszy plik .ddd aby rozpocząć analizę.
                    </p>
                </div>
            )}
        </>
    );
}