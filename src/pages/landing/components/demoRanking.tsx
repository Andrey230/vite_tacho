const drivers = [
    { name: "Michał Kowalczyk", km: 18454, days: 28 },
    { name: "Paweł Dąbrowski", km: 12906, days: 24 },
    { name: "Tomasz Zieliński", km: 1137, days: 23 },
    { name: "Krzysztof Nowak", km: 943, days: 12 },
    { name: "Piotr Wiśniewski", km: 717, days: 9 },
];

export function DemoRanking() {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                <tr>
                    <th>Kierowca</th>
                    <th>Dni robocze</th>
                    <th>Przebieg (km)</th>
                </tr>
                </thead>
                <tbody>
                {drivers.map((d) => (
                    <tr key={d.name}>
                        <td>{d.name}</td>
                        <td>{d.days}</td>
                        <td className="font-semibold">{d.km}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
