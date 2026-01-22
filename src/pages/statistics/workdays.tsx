import { NavLink, redirect, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

const baseUrl = import.meta.env.VITE_ENDPOINT_BACKEND;

export async function loader({ params }) {
    let data = {};

    const now = new Date();

    const to = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const fromDate = new Date(now);
    fromDate.setFullYear(fromDate.getFullYear() - 1);

    const from = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, "0")}`;

    const query = new URLSearchParams({
        from,
        to,
    }).toString();

    try {
        const response = await fetch(
            `${baseUrl}/api/driver-statistics/${params.driver_id}?${query}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );

        if (!response.ok) {
            throw new Error("User info failed");
        }

        data = await response.json();
    } catch (error) {
        return redirect("/");
    }

    return { data, driverId: params.driver_id };
}

export default function Workdays() {
    const { data, driverId } = useLoaderData();

    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);

    const lastYear = new Date(now);
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const defaultFrom = lastYear.toISOString().slice(0, 7);

    const [from, setFrom] = useState(defaultFrom);
    const [to, setTo] = useState(currentMonth);
    const [totalDaysOff, setTotalDaysOff] = useState(data.totalDaysOff);
    const [items, setItems] = useState(data.items);

    const handleFromChange = (e) => {
        setFrom(e.target.value);
    };

    const handleToChange = (e) => {
        setTo(e.target.value);
    };

    useEffect(() => {

        console.log(to, from);

        if (!from || !to) return;
        if (from > to) return;

        const fetchStatistics = async () => {
            try {
                const query = new URLSearchParams({ from, to }).toString();

                const response = await fetch(
                    `${baseUrl}/api/driver-statistics/${driverId}?${query}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Statistics fetch failed");
                }

                const result = await response.json();

                setItems(result.items);
                setTotalDaysOff(result.totalDaysOff);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStatistics();
    }, [from, to, driverId]);

    return (
        <>
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
                        <span className="text-sm opacity-70">
                            Dni robocze
                        </span>
                                    <span className="text-success font-semibold">
                            {item.work}
                        </span>
                                </div>

                                <div className="flex justify-between items-center">
                        <span className="text-sm opacity-70">
                            Reszta
                        </span>
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
