import { redirect, useNavigate, NavLink } from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../../providers/AuthProvider";

export async function loader({ params }) {
    if(!localStorage.getItem('token')){
        return redirect('/login');
    }

    return {}
}

export default function Create(){

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const navigate = useNavigate();

    const {createDriver} = useAuth();

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            await createDriver({
                name: name,
                carNumber: number
            });
            navigate('/profile');
        }catch (error){
            console.log(error.message);
        }
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onNumberChange = (e) => {
        setNumber(e.target.value);
    }

    return (
        <>
            <div className="flex justify-center mt-20">
                <div>
                    <div className="bg-base-100 p-8  pb-4 rounded-2xl shadow-xl">
                        <p className="text-2xl font-bold mb-5">Driver form</p>
                        <form onSubmit={onSubmitForm}>
                            <label className="input flex items-center gap-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                                <input type="text" className="grow" placeholder="Driver name" value={name} onChange={onNameChange}/>
                            </label>
                            <label className="input flex items-center gap-2 bg-base-200 mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
                                <input type="text" className="grow" placeholder="Car number" value={number} onChange={onNumberChange}/>
                            </label>
                            <button className="btn btn-primary mt-5">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}