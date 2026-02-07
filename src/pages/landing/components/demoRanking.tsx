const drivers = [
    { name: "Michał Kowalczyk", km: 18454 },
    { name: "Paweł Dąbrowski", km: 12906 },
    { name: "Tomasz Zieliński", km: 717 },
];

export function DemoRanking() {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                <tr>
                    <th>Kierowca</th>
                    <th>Przebieg (km)</th>
                </tr>
                </thead>
                <tbody>
                {drivers.map((d) => (
                    <tr key={d.name}>
                        <td>{d.name}</td>
                        <td className="font-semibold">{d.km}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
