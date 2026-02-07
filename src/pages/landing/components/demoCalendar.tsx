const days = [
    { day: 1, km: 0, off: true },
    { day: 2, km: 811 },
    { day: 3, km: 490 },
    { day: 4, km: 739 },
    { day: 5, km: 561 },
    { day: 6, km: 573 },
    { day: 7, km: 733 },
];

export function DemoCalendar() {
    return (
        <div className="flex gap-5 flex-wrap">
            {days.map((d) => (
                <div
                    key={d.day}
                    className={`relative p-10 rounded-2xl shadow text-center ${
                        d.off ? "bg-error/50" : "bg-success/50"
                    }`}
                >
                    <div className="font-semibold">{d.day} sierpnia</div>
                    <div className="text-lg font-bold">{d.km} km</div>
                </div>
            ))}
        </div>
    );
}
