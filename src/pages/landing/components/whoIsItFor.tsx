export default function WhoIsItFor() {
    return (
        <section className="py-20 bg-base-100 mt-5">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-10">
                    Dla kogo jest Driverfy
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h3 className="card-title">Właściciele firm transportowych</h3>
                            <p>
                                Szybki wgląd w realną pracę kierowców i wykorzystanie floty.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h3 className="card-title">Logistycy i fleet managerowie</h3>
                            <p>
                                Czytelna analityka bez Excela i ręcznych raportów.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
