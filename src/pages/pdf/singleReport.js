export function singleReport({ items, driver, from, to }) {
    const rows = Object.entries(items)
        .map(([month, item]) => {
            const total = item.work + item.dayOff;
            const percent = total
                ? Math.round((item.work / total) * 100)
                : 0;

            return `
        <tr>
          <td>${month}</td>
          <td>${item.totalDistance} km</td>
          <td>${item.work}</td>
          <td>${item.dayOff}</td>
          <td>${percent}%</td>
        </tr>
      `;
        })
        .join("");

    return `<table>
  <thead>
    <tr>
      <th>Miesiąc</th>
      <th>Przebieg</th>
      <th>Dni robocze</th>
      <th>Reszta</th>
      <th>%</th>
    </tr>
  </thead>
  <tbody>
    ${rows}
  </tbody>
</table>`;
}