import RankingList from "../../components/rankingList";

export default function Statistics() {
    return (
        <div className="max-w-6xl mx-auto">

            <div className="mb-8">
                <h1 className="text-3xl font-semibold">
                    Ranking kierowców według przebiegu
                </h1>

                <p className="text-base-content/70 mt-3 max-w-2xl">
                    Zestawienie przedstawia kierowców uporządkowanych według
                    łącznego przebiegu (km) w wybranym miesiącu.
                    Możesz sprawdzić liczbę dni roboczych oraz przejść do
                    szczegółowych statystyk każdego kierowcy.
                </p>
            </div>

            <RankingList />

        </div>
    );
}