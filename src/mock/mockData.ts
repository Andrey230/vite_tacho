import driverData from './data.json';
import dayjs from 'dayjs';

const dayInMinutes = 24 * 60;

export function getData() {
    let data = [];
    const blocks = driverData.Blocks;

    blocks.forEach((block) => {
        if (block.Type === 'DriverCardDriverActivityData') {
            const records = block.CardDriverActivity.CardActivityDailyRecordRecords;
            records.forEach((record) => {
                const date = dayjs(record.ActivityRecordDate);
                const monthKey = date.format('YYYY-MM');

                let dayData = {
                    date: date,
                    distance: Number(record.ActivityDayDistance),
                    activities: {
                        REST: 0,
                        WORK: 0,
                        DRIVING: 0
                    }
                };

                // Обработка активностей
                const dayActivities = record.ActivityChangeInfoRecords;
                for (let i = 0; i < dayActivities.length; i++) {
                    const currentActivity = dayActivities[i];

                    let activityStatus = null;

                    switch (currentActivity.Activity) {
                        case "0x03":
                            activityStatus = "DRIVING";
                            break;
                        case "0x02":
                            activityStatus = "WORK";
                            break;
                        case "0x00":
                            activityStatus = "REST";
                            break;
                    }

                    const nextActivity = dayActivities[i + 1];
                    const currentTime = Number(currentActivity.Minutes);
                    const nextTime = nextActivity ? Number(nextActivity.Minutes) : dayInMinutes; // Если это последний статус, используем конец дня

                    const timeSpent = nextTime - currentTime;

                    dayData.activities[activityStatus] += timeSpent;
                }

                // Добавляем данные дня в месяц
                let monthObject = data.find(item => item.month === monthKey);
                if (!monthObject) {
                    monthObject = {
                        month: monthKey,
                        monthLabel: date.format("MMMM YYYY"),
                        totalDistance: 0,
                        averageDistance: 0,
                        days: []
                    };
                    data.push(monthObject);
                }
                monthObject.days.push(dayData);
                monthObject.totalDistance += dayData.distance;
            });
        }
    });

    // Вычисляем среднюю дистанцию и добавляем ее в каждый месяц
    data.forEach(monthObject => {
        const numDays = monthObject.days.length;
        if (numDays > 0) {
            monthObject.averageDistance = monthObject.totalDistance / numDays;
        }
    });

    data.reverse();
    // Возвращаем полученные данные
    return data;
}