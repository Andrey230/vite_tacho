import {useAuth} from "../providers/AuthProvider";
import { useNavigate, NavLink, Link } from "react-router-dom";
import {useEffect, useState} from "react";
import dayjs from 'dayjs';
import DriverList from "../components/driverList";
import RankingList from "../components/rankingList";
import {convertMinutesToTime} from "../services/timeHelper";

export default function Profile(){

    const {user, token, uploadDriver, getActivitiesByMonth} = useAuth();
    const navigate = useNavigate();

    const current = dayjs();

    const [currentMonth, setCurrentMonth] = useState(current.format("YYYY-MM"));
    const [activityDrivers, setActivityDrivers] = useState([]);

    useEffect(() => {
        if(!token){
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        getActivitiesByMonth(currentMonth).then((data) => setActivityDrivers(data));
    }, [currentMonth]);

    if(!user){
        return "";
    }

    return (
        <>
            <p className="text-2xl font-bold">Witam, {user.name}</p>
            <div className="stats shadow mt-5">
                <div className="stats stats-horizontal shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-8 h-8 fill-primary" viewBox="0 0 640 512"><path d="M64 32C28.7 32 0 60.7 0 96V304v80 16c0 44.2 35.8 80 80 80c26.2 0 49.4-12.6 64-32c14.6 19.4 37.8 32 64 32c44.2 0 80-35.8 80-80c0-5.5-.6-10.8-1.6-16H416h33.6c-1 5.2-1.6 10.5-1.6 16c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H608c17.7 0 32-14.3 32-32V288 272 261.7c0-9.2-3.2-18.2-9-25.3l-58.8-71.8c-10.6-13-26.5-20.5-43.3-20.5H480V96c0-35.3-28.7-64-64-64H64zM585 256H480V192h48.8c2.4 0 4.7 1.1 6.2 2.9L585 256zM528 368a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM176 400a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM80 368a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                        </div>
                        <div className="stat-title">Liczba kierowców</div>
                        <div className="stat-value text-primary">{user.drivers.length}/{user.subscription.maxDrivers}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Twój plan</div>
                        <div className="stat-value text-secondary">{user.subscription.name}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Początek pracy</div>
                        <div className="stat-value">{convertMinutesToTime(user.options.full_day_start)}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Koniec pracy</div>
                        <div className="stat-value">{convertMinutesToTime(user.options.full_day_end)}</div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <DriverList drivers={user.drivers}/>
            </div>
        </>
    );
}