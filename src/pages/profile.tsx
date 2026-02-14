import { useAuth } from "../providers/AuthProvider";
import DriverList from "../components/driverList";

export default function Profile() {

    const { user } = useAuth();

    // RequireAuth уже гарантирует,
    // что сюда попадёт только авторизованный пользователь

    if (!user) return null;

    return (
        <>
            <div className="max-w-6xl mx-auto">
                <p className="text-2xl font-bold">
                    Witam, {user.name}
                </p>

                <div className="mt-8">
                    <DriverList drivers={user.drivers} />
                </div>
            </div>
        </>
    );
}