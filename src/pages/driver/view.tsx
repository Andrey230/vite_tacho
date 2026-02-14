import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import locale_pl from "dayjs/locale/pl";
import { useAuth } from "../../providers/AuthProvider";
import DriverActivities from "../../components/driverActivities";

dayjs.locale(locale_pl);

interface Driver {
    id: number;
    name: string;
    months: string[];
}

interface Activity {
    // если знаешь структуру — лучше расписать
    [key: string]: any;
}

export default function View() {

    const { driver_id } = useParams<{ driver_id: string }>();
    const { authFetch } = useAuth();

    const [driver, setDriver] = useState<Driver | null>(null);
    const [activeMonth, setActiveMonth] = useState<string>("");
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Загрузка драйвера
    useEffect(() => {

        if (!driver_id) return;

        const fetchDriver = async () => {

            setLoading(true);

            try {
                const response = await authFetch(
                    `/api/driver/${driver_id}`
                );

                if (!response.ok) throw new Error();

                const result: Driver = await response.json();

                setDriver(result);

                if (result.months?.length > 0) {
                    setActiveMonth(result.months[0]);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDriver();

    }, [driver_id, authFetch]);

    // Загрузка активностей
    useEffect(() => {

        if (!driver || !activeMonth) return;

        const fetchActivities = async () => {

            try {
                const response = await authFetch(
                    `/api/driver/${driver.id}/${activeMonth}`
                );

                if (!response.ok) throw new Error();

                const data: Activity[] = await response.json();

                setActivities(data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchActivities();

    }, [driver, activeMonth, authFetch]);

    if (loading && !driver) {
        return (
            <div className="flex justify-center mt-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!driver) return null;

    const months = driver.months;

    const changeActiveMonth = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setActiveMonth(e.target.value);
    };

    return (
        <>
            <h1 className="text-3xl font-bold">
                {driver.name}
            </h1>

            <p className="text-base-content/60 mt-3 max-w-2xl">
                Miesięczny przegląd aktywności kierowcy na podstawie danych z tachografu.
            </p>

            <select
                className="select select-bordered w-56 focus:outline-none focus:ring-2 focus:ring-primary mt-4"
                onChange={changeActiveMonth}
                value={activeMonth}
            >
                {months.map((month) => (
                    <option key={month} value={month}>
                        {dayjs(month).format("MMMM YYYY")}
                    </option>
                ))}
            </select>

            <DriverActivities
                activities={activities}
            />
        </>
    );
}