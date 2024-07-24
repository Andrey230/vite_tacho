import { useState, lazy, Suspense } from "react";
import dayjs from 'dayjs';

const LazyModalContent = lazy(() => import('./ModalContent'));

export default function DriverActivities({activities}) {
    const [openModal, setOpenModal] = useState(null);

    if(activities.length === 0){
        return '';
    }

    const handleOpenModal = (index) => {
        setOpenModal(index);
    };

    const handleCloseModal = () => {
        setOpenModal(null);
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
                    const date = dayjs(day.date.date);

                    const totalDrive = day.activities.DRIVING;
                    const workDay = day.dayType != 'DAY_OFF';

                    let bgDay = 'bg-error/30';
                    let infoColor = 'fill-error';


                    let driveStat = null;

                    if(totalDrive >= 540){
                        driveStat = '9+';
                    }else if(totalDrive >= 480){
                        driveStat = '8+';
                    }

                    switch (day.dayType) {
                        case "FULL":
                            bgDay = 'bg-success/50';
                            infoColor = 'fill-success';
                            break;
                        case "HALF":
                            bgDay = 'bg-warning/30';
                            infoColor = 'fill-warning';
                            break;
                        case "UNKNOWN":
                            bgDay = 'bg-gray-400/50';
                            infoColor = 'fill-gray-400';
                            break;
                    }


                    return <div key={day.date + index} className={`relative p-10 rounded-2xl shadow text-center ${bgDay}`}>


                        <div className="top-3 right-3 absolute">
                            <div className="flex gap-2 items-center">
                                {driveStat ? <span className="text-primary font-bold">{driveStat}</span> : ""}
                                {day.nightDrive ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-primary" viewBox="0 0 384 512"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg> : ""}
                            </div>
                        </div>

                        {workDay ?
                            <div>
                                <div className="absolute top-3 left-3">
                                    <svg onClick={() => handleOpenModal(index)} xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${infoColor}`} viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                                </div>
                                {openModal === index && (
                                    <dialog id={`day_modal_${activities.month + index}`} className="modal bg-base-primary" open>
                                        <div className="modal-box">
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <LazyModalContent day={day} />
                                            </Suspense>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button onClick={handleCloseModal}>close</button>
                                        </form>
                                    </dialog>
                                )}
                            </div> : ""}

                        <p className="mb-1">{date.format("D MMMM")}</p>
                        <p className="font-semibold">{day.distance} km</p>
                        <p className="italic">{day.countries.length > 0 ? <span>{day.countries.join(", ")}</span> : ""}</p>
                    </div>
                })}
            </div>
        </>
    );
}
