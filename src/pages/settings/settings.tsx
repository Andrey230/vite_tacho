import {useAuth} from "../../providers/AuthProvider";
import {useState} from "react";
import {useNotification} from "../root";
import {NotificationTypes} from "../../constants/NotificationTypes";

export default function Settings(){

    const {user, updateOptions} = useAuth();
    const {addNotification} = useNotification();

    if(!user){
        return "";
    }

    const [nightDrive, setNightDrive] = useState<Number|string>(user.options.night_drive);
    const [more21WorkDays, setMore21WorkDays] = useState<Number|string>(user.options.more_21_work_days);
    const [eightPlusDrive, setEightPlusDrive] = useState<Number|string>(user.options.eight_plus_drive);
    const [ninePlusDrive, setNinePlusDrive] = useState<Number|string>(user.options.nine_plus_drive);

    const onSubmitForm = async (e) => {
        e.preventDefault();

        if(
            nightDrive == ''
            || more21WorkDays == ''
            || eightPlusDrive == ''
            || ninePlusDrive == ''
        ) {
            return;
        }

        try {
            await updateOptions({
                options: {
                    night_drive: nightDrive,
                    more_21_work_days: more21WorkDays,
                    eight_plus_drive: eightPlusDrive,
                    nine_plus_drive: ninePlusDrive,
                }
            });

            addNotification({
                type: NotificationTypes.SUCCESS,
                message: 'Ustawienia zostały zapisane'
            });
        }catch (error){
            addNotification({
                type: NotificationTypes.ERROR,
                message: 'Coś poszło nie tak...'
            });
        }
    }

    const onInputChange = (e, setter) => {
        const value = e.target.value;
        const numberValue = Number(value);

        if (Number.isInteger(numberValue) && numberValue > 0) {
            setter(value);
        } else if (value === '') {
            setter('');
        }
    }


    return (
        <>
            <div className="flex justify-center mt-20">
                <div>
                    <div className="bg-base-100 p-8  pb-10 rounded-2xl shadow-xl">
                        <p className="text-2xl font-bold mb-5">Ustawenia</p>

                        <form onSubmit={onSubmitForm}>
                            <label className="form-control w-full max-w-xs mb-5">
                                <div className="label">
                                    <span className="label-text">Premia za jazdę nocną</span>
                                </div>
                                <input type="number" min={0} value={nightDrive} onChange={(e) => {onInputChange(e, setNightDrive)}} className={`input w-full max-w-xs bg-base-200 ${nightDrive == '' ? 'input-error' : ''}`} />
                            </label>

                            <label className="form-control w-full max-w-xs mb-5">
                                <div className="label">
                                    <span className="label-text">Premia za każdy dodatkowy dzień roboczy (21+)</span>
                                </div>
                                <input type="number" min={0} value={more21WorkDays} onChange={(e) => {onInputChange(e, setMore21WorkDays)}} className={`input w-full max-w-xs bg-base-200 ${more21WorkDays == '' ? 'input-error' : ''}`} />
                            </label>

                            <label className="form-control w-full max-w-xs mb-5">
                                <div className="label">
                                    <span className="label-text">Premia za ponad 8 godzin jazdy w ciągu dnia</span>
                                </div>
                                <input type="number" min={0} value={eightPlusDrive} onChange={(e) => {onInputChange(e, setEightPlusDrive)}} className={`input w-full max-w-xs bg-base-200 ${eightPlusDrive == '' ? 'input-error' : ''}`} />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Premia za ponad 9 godzin jazdy w ciągu dnia</span>
                                </div>
                                <input type="number" min={0} value={ninePlusDrive} onChange={(e) => {onInputChange(e, setNinePlusDrive)}} className={`input w-full max-w-xs bg-base-200 ${ninePlusDrive == '' ? 'input-error' : ''}`} />
                            </label>
                            <button className="btn btn-primary mt-5">Zapisz</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}