export default function Hero() {
    return (
        <section className="hero min-h-[40vh] bg-base-100">
            <div className="hero-content text-center">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Analityka pracy kierowców <br /> i danych tachografu
                    </h1>

                    <p className="py-6 text-lg opacity-80">
                        Driverfy przekształca dane z tachografu w czytelną statystykę:
                        przebieg, dni robocze, aktywność dzienną i porównania kierowców.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button className="btn btn-primary">
                            Zobacz demo
                        </button>
                        <button className="btn btn-outline">
                            Poproś o dostęp
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}