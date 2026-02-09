export default function Rules() {
    return (
        <section className="bg-base-100 py-20">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2">
                        Regulamin Driverfy
                    </h1>
                    <p className="text-base-content/70">
                        Zasady korzystania z platformy analitycznej Driverfy
                    </p>

                    <div className="mt-4">
            <span className="badge badge-outline">
              Ostatnia aktualizacja: 09.02.2026
            </span>
                    </div>
                </div>

                {/* Content */}
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body space-y-10">

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">
                                1. Postanowienia ogólne
                            </h2>
                            <p className="text-base-content/80">
                                Niniejszy Regulamin określa zasady korzystania z serwisu
                                internetowego <strong>Driverfy</strong> (dalej: „Serwis”).
                            </p>
                            <p className="text-base-content/80 mt-2">
                                Driverfy jest platformą analityczną przeznaczoną dla firm
                                transportowych, umożliwiającą analizę danych pochodzących
                                z tachografów oraz prezentację statystyk dotyczących pracy
                                kierowców.
                            </p>
                            <p className="text-base-content/80 mt-2">
                                Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu.
                            </p>
                        </section>

                        <div className="divider" />

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">
                                2. Definicje
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-base-content/80">
                                <li>
                                    <strong>Użytkownik</strong> – osoba korzystająca z Serwisu
                                    w imieniu firmy, posiadająca Konto.
                                </li>
                                <li>
                                    <strong>Konto</strong> – indywidualne konto umożliwiające
                                    dostęp do funkcjonalności Serwisu.
                                </li>
                                <li>
                                    <strong>Dane</strong> – informacje wprowadzane do Serwisu,
                                    w tym dane kierowców oraz dane z tachografów.
                                </li>
                            </ul>
                        </section>

                        <div className="divider" />

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">
                                3. Zakres usług
                            </h2>

                            <ul className="list-disc list-inside space-y-2 text-base-content/80">
                                <li>analiza danych z tachografów,</li>
                                <li>statystyki dzienne i miesięczne kierowców,</li>
                                <li>podgląd aktywności w ciągu dnia,</li>
                                <li>porównania kierowców według wybranych kryteriów.</li>
                            </ul>

                            <div className="alert alert-warning mt-6">
                <span>
                  Driverfy <strong>nie służy do oceny naruszeń przepisów prawa</strong>
                  i nie zastępuje kontroli ani audytu tachografów.
                </span>
                            </div>
                        </section>

                        <div className="divider" />

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">
                                4. Dane osobowe
                            </h2>
                            <p className="text-base-content/80">
                                Dane osobowe przetwarzane są zgodnie z obowiązującymi przepisami,
                                w szczególności z RODO.
                            </p>
                            <p className="text-base-content/80 mt-2">
                                Użytkownik oświadcza, że posiada podstawę prawną do przetwarzania
                                danych kierowców oraz ich wprowadzania do Serwisu.
                            </p>
                        </section>

                        <div className="divider" />

                        {/* Section */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">
                                5. Odpowiedzialność
                            </h2>
                            <p className="text-base-content/80">
                                Administrator nie ponosi odpowiedzialności za decyzje podjęte
                                na podstawie danych prezentowanych w Serwisie.
                            </p>
                        </section>

                        <div className="divider" />

                        {/* Footer */}
                        <section className="text-sm text-base-content/60">
                            <p>
                                Regulamin obowiązuje od dnia publikacji i może być okresowo
                                aktualizowany.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </section>
    );
}
