import {DemoCalendar} from "./demoCalendar.tsx";
import DemoDailyActivities from "./demoDailyActivities.tsx";

export default function LiveDemo() {
    return (
        <section className="py-20 bg-base-100 mt-5">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    Jak wygląda Driverfy w praktyce
                </h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* MONTH VIEW */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">
                            Aktywność kierowcy w skali miesiąca
                        </h3>

                        <p className="text-sm opacity-70 mb-5">
                            Przegląd pracy jednego kierowcy w wybranym miesiącu.
                            Widzisz liczbę przepracowanych dni, przebieg oraz ogólną
                            aktywność bez konieczności analizy surowych danych z tachografu.
                        </p>

                        <DemoCalendar />
                    </div>

                    {/* DAY VIEW */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">
                            Aktywności kierowcy w ciągu dnia
                        </h3>

                        <p className="text-sm opacity-70 mb-5">
                            Szczegółowa oś czasu pokazująca, co kierowca robił w danym dniu.
                            Możesz sprawdzić dokładnie kiedy prowadził pojazd, pracował
                            lub odpoczywał — wszystko w czytelnej kolejności czasowej.
                        </p>

                        <DemoDailyActivities />
                    </div>
                </div>
            </div>
        </section>
    );
}


