import { useState } from "react";
import Day from "./activities/day";

export default function DriverActivities({ activities }) {
    const [openModal, setOpenModal] = useState(null);

    if (!activities || !activities.days || activities.days.length === 0) {
        return null;
    }

    const handleOpenModal = (index) => {
        setOpenModal((prev) => (prev === index ? null : index));
    };

    const handleCloseModal = () => {
        setOpenModal(null);
    };

    const avg = activities.additionalInformation?.averageDistance ?? 0;
    const avgRounded = Math.round(avg);

    return (
        <>


            {/* SUMMARY CARD */}
            <div className="bg-base-100 rounded-2xl shadow p-4 mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    <div>
                        <p className="text-sm text-base-content/60">
                            Łączny przebieg
                        </p>
                        <p className="text-xl font-bold">
                            {activities.totalDistance.toLocaleString("pl-PL")} km
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-base-content/60">
                            Średni przebieg (dzień roboczy)
                        </p>
                        <p className="text-xl font-bold">
                            {avgRounded.toLocaleString("pl-PL")} km
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-base-content/60">
                            Dni robocze
                        </p>
                        <p className="text-xl font-bold">
                            {activities.additionalInformation.totalWorkDays}
                        </p>
                    </div>
                </div>

                {/* LEGENDA */}
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-base-content/70">

                    <span className="inline-flex items-center gap-2">
                        <span className="font-bold text-primary">8+</span>
                        dzień z jazdą powyżej 8 godzin
                    </span>

                    <span className="inline-flex items-center gap-2">
                        <span className="font-bold text-primary">9+</span>
                        dzień z jazdą powyżej 9 godzin
                    </span>

                    <span className="inline-flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-primary" viewBox="0 0 384 512">
                            <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
                        </svg>
                        jazda nocna
                    </span>

                    <span className="inline-flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-success/50 inline-block"></span>
                        pełny dzień pracy
                    </span>

                    <span className="inline-flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-warning/30 inline-block"></span>
                        częściowy dzień
                    </span>

                    <span className="inline-flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-error/30 inline-block"></span>
                        brak aktywności
                    </span>

                </div>

            </div>

            {/* DAYS GRID — НЕ ТРОГАЕМ */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5 mt-6">
                {activities.days.map((day, index) => (
                    <Day
                        key={index}
                        day={day}
                        index={index}
                        openModal={openModal}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        setOpenModal={setOpenModal}
                    />
                ))}
            </div>
        </>
    );
}