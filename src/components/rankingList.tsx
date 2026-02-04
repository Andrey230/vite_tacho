import {useEffect, useState} from "react";
import dayjs from 'dayjs';
import { NavLink } from "react-router-dom";
import {useAuth} from "../providers/AuthProvider";
import PdfDocument from "../pages/pdf/pdfDocument.tsx";
import {PDFDownloadLink} from "@react-pdf/renderer";
import RankingPdf from "../pages/pdf/rankingPdf.tsx";

export default function RankingList(){
    const current = dayjs();
    const previousMonth = current.subtract(1, 'month');

    const {getActivitiesByMonth} = useAuth();

    const [activityDrivers, setActivityDrivers] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(previousMonth.format("YYYY-MM"));

    useEffect(() => {
        getActivitiesByMonth(currentMonth).then((data) => setActivityDrivers(data));
    }, [currentMonth]);

    const numPreviousMonths = 20;
    let months = [];

    for (let i = 1; i <= numPreviousMonths; i++) {
        const prevMonth = current.subtract(i, 'month');
        months.push(prevMonth.format('YYYY-MM'));
    }

    const onMonthChange = (e) => {
        setCurrentMonth(e.target.value);
    }

    return (
        <>
            <div className="flex items-center gap-5">
                <select className="select w-full max-w-xs shadow" onChange={onMonthChange}>
                    {months.map((month, index) => {
                        return <option key={index} value={month}>{month}</option>
                    })}
                </select>

                <PDFDownloadLink
                    document={
                        <RankingPdf
                            items={activityDrivers}
                            month={currentMonth}
                        />
                    }
                    fileName={`statystyki_${currentMonth}.pdf`}
                    className="btn btn-primary btn-sm md:btn-md"
                >
                    PDF
                </PDFDownloadLink>
            </div>

            {activityDrivers.length > 0 ? <div className="bg-base-100 shadow rounded-2xl p-5 mt-5">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th></th>
                                <th>Kierowca</th>
                                <th>Dni robocze</th>
                                <th>Km</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            {activityDrivers.map((driver, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="https://static.vecteezy.com/system/resources/previews/026/175/074/original/driver-avatar-round-flat-icon-vector.jpg" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{driver.driver.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="font-bold">{driver.additionalInformation.totalWorkDays}</span>
                                        </td>
                                        <td>
                                            <span className="font-bold">{driver.totalDistance}</span>
                                        </td>
                                        <th>
                                            <div className="flex gap-3">
                                                <NavLink to={`/driver/`+driver.driver.id} className="btn btn-primary btn-xs">statystyka</NavLink>
                                            </div>
                                        </th>
                                    </tr>
                                );
                            }) }
                            </tbody>
                            <tfoot>
                            </tfoot>

                        </table>
                    </div>
                </div> :
                <p className="text-xl font-bold mt-5">No drivers found for this period</p>
            }
        </>
    );
}