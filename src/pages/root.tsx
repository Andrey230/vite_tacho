import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default function Root(){

    return (
        <>
            <Header />
            <div className="bg-base-300 pt-6 pb-8 min-h-screen flex justify-center">
                <div className="container px-5 xl:px-0">
                    <Outlet />
                </div>
            </div>
        </>
    );
}