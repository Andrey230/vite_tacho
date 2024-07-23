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

                    const totalWork = day.activities.DRIVING;
                    const workDay = day.dayType != 'DAY_OFF';

                    let bgDay = 'bg-error/30';
                    let infoColor = 'fill-error';

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
                        {totalWork > 540 ? <div className="top-3 right-3 absolute"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 fill-primary/80"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg></div> : ""}

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
