import {useAuth} from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import {useNotification} from "../pages/root";
import {NotificationTypes} from "../constants/NotificationTypes";

export default function DriverList({drivers}){

    const {uploadDriver} = useAuth();
    const {addNotification} = useNotification();

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
                        message: `${result.name} added successfully`
                    });
                }
            }catch (error){
                addNotification({
                    type: NotificationTypes.ERROR,
                    message: 'Something went wrong =('
                });
            }

        };

        reader.readAsDataURL(file);
    }

    return (
        <>

            <div className="flex justify-start gap-5 items-center mb-4">
                <p className="font-semibold text-2xl">Your drivers</p>
                <label className="cursor-pointer">
                    <input type="file" className="hidden" onChange={onUploadDriver} />
                    <div className="btn btn-primary btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-base-100" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    </div>
                </label>
            </div>
            {drivers.length > 0 ?  <>
                <div className="bg-base-100 shadow rounded-2xl p-5 mt-2">
                    <div className="overflow-x-auto">
                        {drivers.length > 0 ? <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Car number</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            {drivers.map((driver, index) => {
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
                                                <NavLink to={`/driver/`+driver.id} className="btn btn-primary btn-xs">statistics</NavLink>
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

                        </table> : ""}
                    </div>
                </div>
            </>: <p className="text-xl font-bold mt-5">You don't have drivers yet</p>}
        </>
    );
}