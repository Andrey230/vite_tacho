import {useAuth} from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import {useNotification} from "../pages/root";
import {NotificationTypes} from "../constants/NotificationTypes";
import {useState} from "react";

export default function DriverList({drivers}){

    const {uploadDriver} = useAuth();
    const {addNotification} = useNotification();
    const [searchValue, setSearchValue] = useState('');
    const [filteredDrivers, setDrivers] = useState(drivers);


    const onUploadDriver = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();


        reader.onload = async (event) => {
            const dataUrl = event.target.result;
            const content = dataUrl.split(',')[1];

            try {
                const result = await uploadDriver({
                    file: content
                });

                if(result){
                    addNotification({
                        type: NotificationTypes.SUCCESS,
                        message: `Dodano ${result.name}`
                    });
                }
            }catch (error){
                addNotification({
                    type: NotificationTypes.ERROR,
                    message: 'Coś poszło nie tak...'
                });
            }

        };

        reader.readAsDataURL(file);
    }

    const findDrivers = (event) => {
        const value = event.target.value.toLowerCase().replace(/\s+/g, "");
        setSearchValue(value);

        const newDrivers = drivers.filter(driver =>
            driver.name.toLowerCase().replace(/\s+/g, "").includes(value) ||
            driver.carNumber.toLowerCase().replace(/\s+/g, "").includes(value)
        );

        setDrivers(newDrivers);
    }

    return (
        <>

            <div className="flex justify-start gap-5 items-center mb-4">
                <p className="font-semibold text-2xl">Twoi kierowcy</p>
                <label className="cursor-pointer">
                    <input type="file" className="hidden" onChange={onUploadDriver} />
                    <div className="btn btn-primary btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-base-100" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    </div>
                </label>
            </div>

            <label className="input input-bordered flex items-center gap-2 w-64 shadow mb-5">
                <input type="text" className="grow" placeholder="Znajdź kierowcę" value={searchValue} onChange={findDrivers} />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </label>

            {filteredDrivers.length > 0 ?  <>
                <div className="bg-base-100 shadow rounded-2xl p-5 mt-2">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>Kierowca</th>
                                <th>Numer samochodu</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            {filteredDrivers.map((driver, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="https://static.vecteezy.com/system/resources/previews/026/175/074/original/driver-avatar-round-flat-icon-vector.jpg" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{driver.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="font-bold">{driver.carNumber}</span>
                                        </td>
                                        <th>
                                            <div className="flex gap-3">
                                                <NavLink to={`/driver/`+driver.id} className="btn btn-primary btn-xs">statystyka</NavLink>
                                            </div>
                                        </th>
                                    </tr>
                                );
                            }) }
                            </tbody>
                            <tfoot>
                            {/*<tr>*/}
                            {/*    <th></th>*/}
                            {/*    <th>Name</th>*/}
                            {/*    <th>Job</th>*/}
                            {/*    <th>Favorite Color</th>*/}
                            {/*    <th></th>*/}
                            {/*</tr>*/}
                            </tfoot>

                        </table>
                    </div>
                </div>
            </>: <p className="text-xl font-bold mt-5">You don't have drivers yet</p>}
        </>
    );
}