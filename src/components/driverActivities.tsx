import React from "react";
import {convertMinutesToTime} from "../services/timeHelper";
import dayjs from 'dayjs';

export default function DriverActivities({activities}) {

    if(activities.length === 0){
        return '';
    }

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
                                    <svg onClick={()=>document.getElementById(`day_modal_${activities.month + index}`).showModal()} xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${infoColor}`} viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                                </div>
                                <dialog id={`day_modal_${activities.month + index}`} className="modal bg-base-primary">
                                    <div className="modal-box">
                                        <div className="flex gap-5 justify-between mb-5">
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-primary" viewBox="0 0 640 512"><path d="M64 32C28.7 32 0 60.7 0 96V304v80 16c0 44.2 35.8 80 80 80c26.2 0 49.4-12.6 64-32c14.6 19.4 37.8 32 64 32c44.2 0 80-35.8 80-80c0-5.5-.6-10.8-1.6-16H416h33.6c-1 5.2-1.6 10.5-1.6 16c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H608c17.7 0 32-14.3 32-32V288 272 261.7c0-9.2-3.2-18.2-9-25.3l-58.8-71.8c-10.6-13-26.5-20.5-43.3-20.5H480V96c0-35.3-28.7-64-64-64H64zM585 256H480V192h48.8c2.4 0 4.7 1.1 6.2 2.9L585 256zM528 368a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM176 400a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM80 368a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                                                {convertMinutesToTime(day.activities.DRIVING)}
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-success" viewBox="0 0 576 512"><path d="M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6V105.5L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0h18.1c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z"/></svg>
                                                {convertMinutesToTime(day.activities.WORK)}
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-error" viewBox="0 0 640 512"><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>
                                                {convertMinutesToTime(day.activities.REST)}
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-warning" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                                                {convertMinutesToTime(day.activities.AVAILABILITY)}
                                            </div>
                                        </div>

                                        <div className="text-left">
                                            <ul className="steps steps-vertical">
                                                {calculatePercentages(day.refactorActivities).map((a, i) => {
                                                    let color = 'step-error';
                                                    let icon = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-error" viewBox="0 0 640 512"><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>;

                                                    switch (a.activity){
                                                        case "DRIVING":
                                                            color = 'step-primary';
                                                            icon = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-primary" viewBox="0 0 640 512"><path d="M64 32C28.7 32 0 60.7 0 96V304v80 16c0 44.2 35.8 80 80 80c26.2 0 49.4-12.6 64-32c14.6 19.4 37.8 32 64 32c44.2 0 80-35.8 80-80c0-5.5-.6-10.8-1.6-16H416h33.6c-1 5.2-1.6 10.5-1.6 16c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H608c17.7 0 32-14.3 32-32V288 272 261.7c0-9.2-3.2-18.2-9-25.3l-58.8-71.8c-10.6-13-26.5-20.5-43.3-20.5H480V96c0-35.3-28.7-64-64-64H64zM585 256H480V192h48.8c2.4 0 4.7 1.1 6.2 2.9L585 256zM528 368a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM176 400a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM80 368a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>;
                                                            break;
                                                        case "WORK":
                                                            color = 'step-success';
                                                            icon = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-success" viewBox="0 0 576 512"><path d="M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6V105.5L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0h18.1c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z"/></svg>;
                                                            break;
                                                        case "AVAILABILITY":
                                                            color = 'step-warning';
                                                            icon = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-warning" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>;
                                                            break;
                                                        case "INACTIVE":
                                                            color = 'step-base-300';
                                                            icon = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-base-300" viewBox="0 0 576 512"><path d="M96 0C78.3 0 64 14.3 64 32v96h64V32c0-17.7-14.3-32-32-32zM288 0c-17.7 0-32 14.3-32 32v96h64V32c0-17.7-14.3-32-32-32zM32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32v32c0 77.4 55 142 128 156.8V480c0 17.7 14.3 32 32 32s32-14.3 32-32V412.8c12.3-2.5 24.1-6.4 35.1-11.5c-2.1-10.8-3.1-21.9-3.1-33.3c0-80.3 53.8-148 127.3-169.2c.5-2.2 .7-4.5 .7-6.8c0-17.7-14.3-32-32-32H32zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm59.3-180.7L454.6 368l36.7 36.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L432 390.6l-36.7 36.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L409.4 368l-36.7-36.7c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L432 345.4l36.7-36.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>;
                                                            break;
                                                    }

                                                    return <li key={date.format("YYYYdm") + i} className="step">
                                                        <div className="flex gap-3 items-center">
                                                            {convertMinutesToTime(a.minutes)}
                                                            {icon}
                                                            {convertMinutesToTime(a.end)}
                                                            <span className="text-base-content font-bold">({convertMinutesToTime(a.duration)})</span>
                                                        </div>
                                                    </li>;
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                </dialog>
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

function calculatePercentages(data){

    const activityPercentages = [];
    const totalMinutesInDay = 1440;

    for (let i = 0; i < data.length; i++) {
        const currentActivity = data[i];
        const nextActivity = data[i + 1];

        const duration = nextActivity ? nextActivity.minutes - currentActivity.minutes : totalMinutesInDay - currentActivity.minutes;
        const percentage = calculatePercentage(duration, totalMinutesInDay);

        activityPercentages.push({
            activity: currentActivity.cardStatus === 'inactive' ? "INACTIVE" : currentActivity.activity,
            duration: duration,
            percentage: percentage.toFixed(2),
            end: nextActivity ? nextActivity.minutes : totalMinutesInDay,
            minutes: currentActivity.minutes,
            time: convertMinutesToTime(duration)
        });
    }


    return activityPercentages;
}

function calculatePercentage(part, total) {
    return (part / total) * 100;
}
