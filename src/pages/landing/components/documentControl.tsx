export default function DocumentControl() {
    return (
        <section className="py-16 bg-base-100 mt-5">

            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

                {/* MOCK LIST */}

                <div className="space-y-4">

                    <div className="card bg-base-100 shadow-lg p-4 flex justify-between">
                        <span>Badanie techniczne</span>
                        <span className="badge badge-error mt-3">
                            Za 3 dni
                        </span>
                    </div>

                    <div className="card bg-base-100 shadow-lg p-4 flex justify-between">
                        <span>Ubezpieczenie OC</span>
                        <span className="badge badge-warning mt-3">
                            Za 14 dni
                        </span>
                    </div>

                    <div className="card bg-base-100 shadow-lg p-4 flex justify-between">
                        <span>Karta kierowcy</span>
                        <span className="badge badge-success mt-3">
                            Aktywne
                        </span>
                    </div>

                </div>

                {/* TEXT */}

                <div>

                    <h2 className="text-3xl font-bold">
                        Kontrola dokumentów i terminów
                    </h2>

                    <p className="text-base-content/60 mt-3">
                        Zarządzaj dokumentami kierowców, pojazdów i przyczep
                        w jednym miejscu i reaguj zanim pojawi się problem.
                    </p>

                    <div className="mt-6 space-y-3">

                        <div className="flex gap-3">
                            <span>✔</span>
                            <span>Dokumenty kierowców, pojazdów i przyczep</span>
                        </div>

                        <div className="flex gap-3">
                            <span>✔</span>
                            <span>Powiadomienia o wygasających terminach</span>
                        </div>

                        <div className="flex gap-3">
                            <span>✔</span>
                            <span>Notatki i historia zdarzeń</span>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}