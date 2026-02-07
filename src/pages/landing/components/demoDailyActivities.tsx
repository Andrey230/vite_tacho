const driveIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-primary"
                       viewBox="0 0 640 512">
    <path
        d="M64 32C28.7 32 0 60.7 0 96V304v80 16c0 44.2 35.8 80 80 80c26.2 0 49.4-12.6 64-32c14.6 19.4 37.8 32 64 32c44.2 0 80-35.8 80-80c0-5.5-.6-10.8-1.6-16H416h33.6c-1 5.2-1.6 10.5-1.6 16c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H608c17.7 0 32-14.3 32-32V288 272 261.7c0-9.2-3.2-18.2-9-25.3l-58.8-71.8c-10.6-13-26.5-20.5-43.3-20.5H480V96c0-35.3-28.7-64-64-64H64zM585 256H480V192h48.8c2.4 0 4.7 1.1 6.2 2.9L585 256zM528 368a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM176 400a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM80 368a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
</svg>;

const restIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-error"
                      viewBox="0 0 640 512">
    <path
        d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"></path>
</svg>;

const workIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-success"
                      viewBox="0 0 576 512">
    <path
        d="M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6V105.5L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0h18.1c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z"></path>
</svg>;

const waitingIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-warning"
                         viewBox="0 0 512 512">
    <path
        d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
</svg>;

const activities = [
    { from: "06:00", to: "09:00", type: "drive", icon: driveIcon, total: "3:00" },
    { from: "09:00", to: "09:48", type: "work", icon: workIcon, total: "0:48" },
    { from: "09:48", to: "12:18", type: "drive", icon: driveIcon, total: "2:30" },
    { from: "12:18", to: "17:39", type: "rest", icon: restIcon, total: "5:21" },
    { from: "17:39", to: "19:44", type: "drive", icon: driveIcon, total: "2:05" },
    { from: "19:44", to: "20:44", type: "work", icon: workIcon, total: "1:00" },
];

export default function DemoDailyActivities() {
    return (
        <>
            <div>
                <div className="flex gap-5 justify-between mb-5 pt-4">
                    <div className="flex gap-1 items-center">
                        {driveIcon}
                        07:35
                    </div>
                    <div className="flex gap-1 items-center">
                        {workIcon}
                        01:48
                    </div>
                    <div className="flex gap-1 items-center">
                        {restIcon}
                        05:21
                    </div>
                    {/*<div className="flex gap-1 items-center">*/}
                    {/*    {waitingIcon}*/}
                    {/*    00:00*/}
                    {/*</div>*/}
                </div>
                <div className="text-left">
                    <ul className="steps steps-vertical">
                        {activities.map((a) => (
                            <li className="step">
                                <div className="flex gap-3 items-center">{a.from}
                                    {a.icon}
                                    {a.to}<span className="text-base-content font-bold">({a.total})</span></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}