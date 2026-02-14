import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "../pdf/pdfDocument.tsx";
import { useAuth } from "../../providers/AuthProvider";

interface WorkdayItem {
    work: number;
    dayOff: number;
    totalDistance: number;
}

interface WorkdaysResponse {
    driver: {
        id: number;
        name: string;
    };
    items: Record<string, WorkdayItem>;
    totalDaysOff: number;
}

export default function Workdays() {

    const { driver_id } = useParams<{ driver_id: string }>();
    const { authFetch } = useAuth();

    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);

    const lastYear = new Date(now);
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const defaultFrom = lastYear.toISOString().slice(0, 7);

    const [from, setFrom] = useState<string>(defaultFrom);
    const [to, setTo] = useState<string>(currentMonth);

    const [data, setData] = useState<WorkdaysResponse | null>(null);
    const [items, setItems] = useState<Record<string, WorkdayItem>>({});
    const [totalDaysOff, setTotalDaysOff] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFrom(e.target.value);
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTo(e.target.value);
    };

    useEffect(() => {

        if (!driver_id) return;
        if (!from || !to) return;
        if (from > to) return;

        const fetchStatistics = async () => {

            setLoading(true);

            try {
                const query = new URLSearchParams({ from, to }).toString();

                const response = await authFetch(
                    `/api/driver-statistics/${driver_id}?${query}`
                );

                if (!response.ok) {
                    throw new Error();
                }

                const result: WorkdaysResponse = await response.json();

                setData(result);
                setItems(result.items);
                setTotalDaysOff(result.totalDaysOff);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();

    }, [driver_id, from, to, authFetch]);

    if (loading && !data) {
        return (
            <div className="flex justify-center mt-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!data) return null;

    return (
        <>
            <div className="flex items-center gap-5">
                <h1 className="text-3xl">{data.driver.name}</h1>

                <PDFDownloadLink
                    document={<PdfDocument items={items} />}
                    fileName={`statystyki_${data.driver.name.replace(/\s+/g, '_')}_${from}_${to}.pdf`}
                    className="btn btn-primary btn-sm md:btn-md"
                >
                    PDF
                </PDFDownloadLink>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col gap-3 md:flex-row md:gap-5 md:items-center">
                    <fieldset className="fieldset">
                        <input
                            type="month"
                            className="input"
                            value={from}
                            onChange={handleFromChange}
                            required
                        />
                    </fieldset>

                    <span className="text-4xl">-</span>

                    <fieldset className="fieldset">
                        <input
                            type="month"
                            className="input"
                            value={to}
                            onChange={handleToChange}
                            required
                        />
                    </fieldset>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Dni bez pracy</div>
                        <div className="stat-value text-error">
                            {totalDaysOff}
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE CARDS */}
            <div className="block md:hidden space-y-4 mt-5">
                {Object.entries(items).map(([month, item]) => {
                    const date = new Date(`${month}-01`);

                    const formattedMonth = new Intl.DateTimeFormat(
                        "pl-PL",
                        { month: "long", year: "2-digit" }
                    )
                        .format(date)
                        .replace(/^./, c => c.toUpperCase());

                    const total = item.work + item.dayOff;
                    const percent = total ? Math.round((item.work / total) * 100) : 0;

                    let progressClass = "progress-error";
                    if (percent >= 70) progressClass = "progress-success";
                    else if (percent >= 40) progressClass = "progress-warning";

                    return (
                        <div key={month} className="card bg-base-100 shadow">
                            <div className="card-body gap-3">
                                <h2 className="card-title text-lg">
                                    {formattedMonth}
                                </h2>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm opacity-70">Przebieg</span>
                                    <span className="text font-semibold">
                                        {item.totalDistance} km
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm opacity-70">Dni robocze</span>
                                    <span className="text-success font-semibold">
                                        {item.work}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm opacity-70">Reszta</span>
                                    <span className="text-error font-semibold">
                                        {item.dayOff}
                                    </span>
                                </div>

                                <progress
                                    className={`progress ${progressClass} w-full`}
                                    value={item.work}
                                    max={total}
                                />

                                <div className="text-right text-xs opacity-60">
                                    {percent}% dni roboczych
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-2xl p-5 mt-5">
                <table className="table text-2xl">
                    <thead>
                    <tr>
                        <th>Miesiąc</th>
                        <th>Przebieg</th>
                        <th>Dni robocze</th>
                        <th>Reszta</th>
                        <th>Progres</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(items).map(([month, item]) => {
                        const date = new Date(`${month}-01`);

                        const formattedMonth = new Intl.DateTimeFormat(
                            "pl-PL",
                            { month: "long", year: "2-digit" }
                        )
                            .format(date)
                            .replace(/^./, c => c.toUpperCase());

                        return (
                            <tr key={month}>
                                <td className="italic">
                                    {formattedMonth}
                                </td>
                                <td>
                                    {item.totalDistance} km
                                </td>
                                <td className="text-success">
                                    {item.work}
                                </td>
                                <td className="text-error">
                                    {item.dayOff}
                                </td>
                                <td className="w-64">
                                    <progress
                                        className="progress progress-success"
                                        value={item.work}
                                        max={item.work + item.dayOff}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}