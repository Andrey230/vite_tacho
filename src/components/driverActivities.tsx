import { useState, lazy, Suspense } from "react";
import dayjs from 'dayjs';
import Day from "./activities/day";

const LazyModalContent = lazy(() => import('./ModalContent'));

export default function DriverActivities({activities}) {
    const [openModal, setOpenModal] = useState(null);

    if(activities.length === 0){
        return '';
    }

    const handleOpenModal = (index) => {
        console.log('awd');
        if(!openModal){
            setOpenModal(index);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(null);
        console.log('close');
    };

    return (
        <>
            <div className="stats shadow mt-5">
                <div className="stats stats-horizontal shadow">

                    <div className="stat">
                        <div className="stat-title">Km</div>
                        <div className="stat-value text-xl">{activities.totalDistance}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Średnia</div>
                        <div className="stat-value text-xl">{activities.additionalInformation.averageDistance.toFixed(2)}</div>
                    </div>

                    {/*<div className="stat">*/}
                    {/*    <div className="stat-title">Premia</div>*/}
                    {/*    <div className="stat-value text-xl">{activities[activeMonth].additionalInformation.bonus}</div>*/}
                    {/*</div>*/}

                    <div className="stat">
                        <div className="stat-title">Dni robocze</div>
                        <div className="stat-value text-xl">{activities.additionalInformation.totalWorkDays} <span className="text-gray-400">{activities.additionalInformation.totalUnknownDays > 0 ? `+ (${activities.additionalInformation.totalUnknownDays})` : ""}</span></div>
                    </div>

                </div>
            </div>

            <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5 mt-5`}>
                {activities.days.map((day, index) => {
                    return <Day
                        day={day}
                        index={index}
                        handleCloseModal={handleCloseModal}
                        handleOpenModal={handleOpenModal}
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        key={index}
                    />
                })}
            </div>
        </>
    );
}
