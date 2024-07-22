import { NavLink, useLoaderData, redirect } from "react-router-dom";
import React, {useState, useMemo, useEffect} from "react";
import dayjs from 'dayjs';
import {convertMinutesToTime} from "../../services/timeHelper";
import {useAuth} from "../../providers/AuthProvider";
import DriverActivities from "../../components/driverActivities";

const baseUrl = import.meta.env.VITE_ENDPOINT_BACKEND;

export async function loader({ params }) {
    let driver = {};

    try {
        const response = await fetch(baseUrl + "/api/driver/"+params.driver_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        });

        if(!response.ok){
            throw new Error('User info failed');
        }

        driver = await response.json();

    } catch (error) {
        return redirect('/');
    }

    return {driver};
}

export default function View(){
    const { driver } = useLoaderData();
    const {getDriverActivitiesByMonth} = useAuth();

    const months = driver.months;

    const [activeMonth, setActiveMonth] = useState(months[0]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const activitiesData = await getDriverActivitiesByMonth(driver.id, activeMonth);
                setActivities(activitiesData);
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();
    }, [activeMonth]);

    const changeActiveMonth = (e) => {
        setActiveMonth(e.target.value);
    }


    return (
        <>
            <p className="text-2xl font-bold">{driver.name}</p>

            <select
                className="select w-full max-w-xs shadow mb-5 mt-5"
                onChange={changeActiveMonth}
                value={activeMonth}
            >
                {months.map((month, index) => (
                    <option key={index} value={month}>
                        {dayjs(month).format("MMMM YYYY")}
                    </option>
                ))}
            </select>

            <br />
            <DriverActivities activities={activities}/>


        </>
    );

}