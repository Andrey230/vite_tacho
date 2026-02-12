import { useLoaderData, redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import locale_pl from "dayjs/locale/pl";
import { useAuth } from "../../providers/AuthProvider";
import DriverActivities from "../../components/driverActivities";

const baseUrl = import.meta.env.VITE_ENDPOINT_BACKEND;
dayjs.locale(locale_pl);

export async function loader({ params }) {
    try {
        const response = await fetch(
            baseUrl + "/api/driver/" + params.driver_id,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );

        if (!response.ok) throw new Error();

        const driver = await response.json();
        return { driver };
    } catch {
        return redirect("/");
    }
}

export default function View() {
    const { driver } = useLoaderData();
    const { getDriverActivitiesByMonth } = useAuth();

    const months = driver.months;

    const [activeMonth, setActiveMonth] = useState(months[0]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const data = await getDriverActivitiesByMonth(
                driver.id,
                activeMonth
            );
            setActivities(data);
        };

        fetchActivities();
    }, [activeMonth]);

    const changeActiveMonth = (e) => {
        setActiveMonth(e.target.value);
    }

    return (
        <>
            <h1 className="text-3xl font-bold">{driver.name}</h1>

            <p className="text-base-content/60 mt-3 max-w-2xl">
                Miesięczny przegląd aktywności kierowcy na podstawie danych z tachografu.
            </p>

            {/* MONTH SELECT + LABEL */}
            <select
                className="select select-bordered w-56 focus:outline-none focus:ring-2 focus:ring-primary mt-4"
                onChange={changeActiveMonth}
                value={activeMonth}
            >
                {months.map((month, index) => (
                    <option key={index} value={month}>
                        {dayjs(month).format("MMMM YYYY")}
                    </option>
                ))}
            </select>

            <DriverActivities
                activities={activities}
                months={months}
                activeMonth={activeMonth}
                setActiveMonth={setActiveMonth}
            />
        </>
    );
}