import dayjs from 'dayjs';
import {lazy, Suspense} from "react";

const LazyModalContent = lazy(() => import('../ModalContent'));

export default function Day({day, index, openModal, handleOpenModal, handleCloseModal, setOpenModal}){
    const date = dayjs(day.date.date);
    const totalDrive = day.activities.DRIVING;
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

    return (
        <div key={day.date + index} className={`cursor-pointer relative p-10 rounded-2xl shadow text-center ${bgDay}`} onClick={() => handleOpenModal(index)}>


            <div className="top-3 right-3 absolute">
                <div className="flex gap-2 items-center">
                    {driveStat ? <span className="text-primary font-bold">{driveStat}</span> : ""}
                    {day.nightDrive ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-primary" viewBox="0 0 384 512"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg> : ""}
                </div>
            </div>

            {openModal === index && (
                <dialog id={`day_modal_${date.format('MM') + index}`} className="modal bg-base-primary" open>
                    <div className="modal-box">
                        <Suspense fallback={<div>Loading...</div>}>
                            <LazyModalContent day={day} setOpenModal={setOpenModal}/>
                        </Suspense>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={handleCloseModal}>close</button>
                    </form>
                </dialog>
            )}

            <p className="mb-1">{date.format("D MMMM")}</p>
            <p className="font-semibold">{day.distance} km</p>
            <p className="italic">{day.countries.length > 0 ? <span>{day.countries.join(", ")}</span> : ""}</p>
        </div>
    );
}