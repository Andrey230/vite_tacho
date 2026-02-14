import { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RankingPdf from "../pages/pdf/rankingPdf.tsx";

interface ActivityDriver {
    driver: {
        id: number;
        name: string;
    };
    totalDistance: number;
    additionalInformation: {
        totalWorkDays: number;
    };
}

export default function RankingList() {

    const { authFetch } = useAuth();

    const current = dayjs();
    const previousMonth = current.subtract(1, "month");

    const [activityDrivers, setActivityDrivers] = useState<ActivityDriver[]>([]);
    const [currentMonth, setCurrentMonth] = useState<string>(
        previousMonth.format("YYYY-MM")
    );
    const [loading, setLoading] = useState<boolean>(false);

    const months = useMemo(() => {
        const numPreviousMonths = 20;
        const arr: string[] = [];

        for (let i = 0; i < numPreviousMonths; i++) {
            arr.push(
                current.subtract(i, "month").format("YYYY-MM")
            );
        }

        return arr;
    }, [current]);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await authFetch(
                    `/api/users/month/${currentMonth}`
                );

                if (!response.ok) {
                    throw new Error();
                }

                const data: ActivityDriver[] = await response.json();
                setActivityDrivers(data);

            } catch {
                setActivityDrivers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [currentMonth, authFetch]);

    const onMonthChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCurrentMonth(e.target.value);
    };

    return (
        <>
            {/* FILTER + PDF */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-6">

                <div>
                    <label className="text-sm font-medium text-base-content/70 block mb-2">
                        Wybierz miesiąc
                    </label>

                    <select
                        className="select w-full max-w-xs shadow"
                        value={currentMonth}
                        onChange={onMonthChange}
                    >
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                <PDFDownloadLink
                    document={
                        <RankingPdf
                            items={activityDrivers}
                            month={currentMonth}
                        />
                    }
                    fileName={`statystyki_${currentMonth}.pdf`}
                    className="btn btn-primary btn-sm md:btn-md"
                >
                    Pobierz PDF
                </PDFDownloadLink>
            </div>

            {/* INFO */}
            <div className="text-sm text-base-content/60 mb-4">
                Dane obejmują łączny przebieg (km) oraz liczbę dni roboczych
                w wybranym miesiącu.
            </div>

            {loading ? (
                <div className="mt-10 text-center">
                    <span className="loading loading-spinner loading-md"></span>
                </div>
            ) : activityDrivers.length > 0 ? (
                <div className="bg-base-100 shadow rounded-2xl p-5">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Kierowca</th>
                                <th>Dni robocze</th>
                                <th>Przebieg (km)</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {activityDrivers.map((driver, index) => (
                                <tr key={driver.driver.id}>
                                    <td className="font-medium">
                                        {index + 1}
                                    </td>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <img
                                                        src="https://static.vecteezy.com/system/resources/previews/026/175/074/original/driver-avatar-round-flat-icon-vector.jpg"
                                                        alt="Driver"
                                                    />
                                                </div>
                                            </div>
                                            <div className="font-semibold">
                                                {driver.driver.name}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="font-semibold">
                                        {
                                            driver.additionalInformation
                                                .totalWorkDays
                                        }
                                    </td>

                                    <td className="font-semibold">
                                        {driver.totalDistance.toLocaleString("pl-PL")}
                                    </td>

                                    <td>
                                        <NavLink
                                            to={`/driver/${driver.driver.id}`}
                                            className="btn btn-primary btn-xs"
                                        >
                                            statystyka
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="mt-10 text-center">
                    <p className="text-lg font-semibold">
                        Brak danych dla wybranego miesiąca
                    </p>
                    <p className="text-base-content/60 mt-2">
                        Upewnij się, że pliki .ddd zostały dodane do systemu.
                    </p>
                </div>
            )}
        </>
    );
}