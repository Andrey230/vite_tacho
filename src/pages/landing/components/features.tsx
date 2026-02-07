const features = [
    {
        title: "Statystyka kierowców",
        desc: "Przebieg, liczba dni roboczych, średnie wartości – wszystko w jednym miejscu.",
    },
    {
        title: "Aktywność dzienna",
        desc: "Szczegółowa oś czasu pokazująca jazdę, pracę i odpoczynki.",
    },
    {
        title: "Porównania miesięczne",
        desc: "Ranking kierowców według przebiegu i aktywności.",
    },
    {
        title: "Kontrola praw jazdy",
        desc: "Śledzenie aktualności praw jazdy (funkcja w przygotowaniu).",
    },
];

export default function Features() {
    return (
        <section className="py-20 bg-base-100 mt-5">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Co oferuje Driverfy
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f) => (
                        <div key={f.title} className="card bg-base-200 shadow">
                            <div className="card-body">
                                <h3 className="card-title">{f.title}</h3>
                                <p className="opacity-80">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
