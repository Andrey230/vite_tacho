import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import DriverList from "../components/driverList";

interface Driver {
    id: number;
    name: string;
    carNumber: string;
}

export default function Profile() {

    const { user, authFetch } = useAuth();

    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDrivers = async () => {

            try {

                // const res = await authFetch("/api/drivers?type=TACHO");
                const res = await authFetch("/api/drivers");

                if (!res.ok) throw new Error();

                const data: Driver[] = await res.json();

                setDrivers(data);

            } catch (e) {

                console.error("Drivers fetch error", e);

            } finally {

                setLoading(false);

            }

        };

        fetchDrivers();

    }, []);

    if (!user) return null;

    return (
        <div className="max-w-6xl mx-auto">

            <p className="text-2xl font-bold">
                Witam, {user.name}
            </p>

            <div className="mt-8">

                {loading ? (
                    <div className="flex justify-center py-10">
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                ) : (
                    <DriverList drivers={drivers} />
                )}

            </div>

        </div>
    );
}