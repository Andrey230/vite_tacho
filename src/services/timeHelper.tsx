export function convertTimeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60) + minutes;
}

export function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}

