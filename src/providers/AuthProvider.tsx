import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

const baseUrl = import.meta.env.VITE_ENDPOINT_BACKEND;

interface User {
    id: number;
    email: string;
    roles: string[];
    drivers: Driver[];
    [key: string]: any;
}

interface Driver {
    id: number;
    name: string;
    carNumber: string;
    cardId?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (credentials: { email: string; password: string }) => Promise<boolean>;
    logout: () => void;
    authFetch: (url: string, options?: RequestInit) => Promise<Response>;
    signUp: (credentials: {
        email: string;
        password: string;
        name: string;
        fullDayStart: number;
        fullDayEnd: number;
    }) => Promise<boolean>;
    addDriverToUser: (driver: Driver) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [loading, setLoading] = useState(true);

    // 🔹 Получение пользователя
    const fetchUser = async (jwt: string) => {
        const response = await fetch(`${baseUrl}/api/user`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (!response.ok) {
            throw new Error("Unauthorized");
        }

        return response.json();
    };

    // 🔹 Инициализация при старте
    useEffect(() => {
        const init = async () => {
            if (token) {
                try {
                    const userData = await fetchUser(token);
                    setUser(userData);
                } catch {
                    logout();
                }
            }
            setLoading(false);
        };

        init();
    }, []);

    // 🔹 Login
    const login = async (credentials: {
        email: string;
        password: string;
    }): Promise<boolean> => {
        const response = await fetch(`${baseUrl}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();

        localStorage.setItem("token", data.token);
        setToken(data.token);

        const userData = await fetchUser(data.token);
        setUser(userData);

        return true;
    };

    //Sign up
    const signUp = async (credentials: {
        email: string;
        password: string;
        name: string;
        fullDayStart: number;
        fullDayEnd: number;
    }) => {

        const response = await fetch(`${baseUrl}/api/users/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error("Signup failed");
        }

        // если backend сразу возвращает token
        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            setToken(data.token);

            const userData = await fetchUser(data.token);
            setUser(userData);
        }

        return true;
    };


    // 🔹 Logout
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const addDriverToUser = (driver: Driver) => {
        setUser(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                drivers: [...(prev.drivers || []), driver]
            };
        });
    };

    // 🔹 Централизованный fetch
    const authFetch = async (
        url: string,
        options: RequestInit = {}
    ): Promise<Response> => {
        const isFormData = options.body instanceof FormData;

        const response = await fetch(`${baseUrl}${url}`, {
            ...options,
            headers: {
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...(options.headers || {}),
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            logout();
        }

        return response;
    };

    const value: AuthContextType = {
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        authFetch,
        signUp,
        addDriverToUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};