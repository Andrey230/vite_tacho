export default function WhoIsItFor() {
    return (
        <section className="py-20 bg-base-100 mt-5">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-10">
                    Dla kogo jest Driverfy
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Owners */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h3 className="card-title">
                                Właściciele firm transportowych
                            </h3>
                            <p>
                                Szybki wgląd w realną pracę kierowców oraz wykorzystanie floty
                                bez konieczności analizy surowych danych.
                            </p>
                        </div>
                    </div>

                    {/* Fleet managers */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h3 className="card-title">
                                Logistycy i fleet managerowie
                            </h3>
                            <p>
                                Czytelna analityka pracy kierowców bez Excela, ręcznych raportów
                                i czasochłonnych zestawień.
                            </p>
                        </div>
                    </div>

                    {/* Drivers */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h3 className="card-title">
                                Kierowcy
                            </h3>
                            <br />
                            <p>
                                Przejrzysty podgląd własnej aktywności — czasu jazdy, pracy
                                i odpoczynku — bez domysłów i nieporozumień.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
