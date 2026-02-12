import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RankingPdf from "../pages/pdf/rankingPdf.tsx";

export default function RankingList() {
    const current = dayjs();
    const previousMonth = current.subtract(1, "month");

    const { getActivitiesByMonth } = useAuth();

    const [activityDrivers, setActivityDrivers] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(
        previousMonth.format("YYYY-MM")
    );

    useEffect(() => {
        getActivitiesByMonth(currentMonth).then((data) =>
            setActivityDrivers(data)
        );
    }, [currentMonth]);

    const numPreviousMonths = 20;
    let months = [];

    for (let i = 1; i <= numPreviousMonths; i++) {
        const prevMonth = current.subtract(i, "month");
        months.push(prevMonth.format("YYYY-MM"));
    }

    const onMonthChange = (e) => {
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
                        {months.map((month, index) => (
                            <option key={index} value={month}>
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

            {/* TABLE */}
            {activityDrivers.length > 0 ? (
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
                                <tr key={index}>
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