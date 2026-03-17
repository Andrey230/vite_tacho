export default function LicenseCheck() {
    return (
        <section className="py-16 bg-base-100 mt-5">

            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

                {/* TEXT */}

                <div>

                    <h2 className="text-3xl font-bold">
                        Kontrola prawa jazdy kierowców
                    </h2>

                    <p className="text-base-content/60 mt-3">
                        Automatyczna weryfikacja statusu prawa jazdy kierowcy
                        na podstawie danych z systemów zewnętrznych.
                    </p>

                    <div className="mt-6 space-y-3">

                        <div className="flex gap-3">
                            <span>✔</span>
                            <span>Sprawdzenie ważności prawa jazdy</span>
                        </div>

                        <div className="flex gap-3">
                            <span>✔</span>
                            <span>Informacja o cofnięciu lub zawieszeniu</span>
                        </div>

                        <div className="flex gap-3">
                            <span>✔</span>
                            <span>Aktualizacja statusu w czasie rzeczywistym</span>
                        </div>

                    </div>

                </div>

                {/* MOCK CARD */}

                <div className="card bg-base-100 shadow-lg">

                    <div className="card-body">

                        <h3 className="font-semibold">
                            Prawo jazdy
                        </h3>

                        <div className="mt-4 flex justify-between items-center">

                            <span>Numer blankiety</span>
                            <span className="font-semibold">BA759847</span>

                        </div>

                        <div className="mt-3 flex justify-between items-center">

                            <span>Status</span>
                            <span className="badge badge-success">
                                Ważne
                            </span>

                        </div>

                        <div className="mt-3 text-sm text-base-content/60">
                            Ostatnia aktualizacja: 10.03.2026 12:30
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}