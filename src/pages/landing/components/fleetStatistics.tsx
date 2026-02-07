import { DemoRanking } from "./demoRanking";

export default function FleetStatistics() {
    return (
        <section className="py-20 bg-base-100 mt-5">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Statystyka całej floty
                </h2>

                <p className="text-center opacity-70 mb-10">
                    Porównanie kierowców według przebiegu i aktywności w wybranym miesiącu.
                </p>

                <DemoRanking />

                <div className="text-xs opacity-50 mt-4 text-right">
                    Dane demonstracyjne
                </div>
            </div>
        </section>
    );
}
