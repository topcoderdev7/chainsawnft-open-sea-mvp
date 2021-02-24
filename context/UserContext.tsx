import { Magic } from "magic-sdk";
import {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";

let m: Magic; // Magic requires window to function

interface User {
    email: string;
}

type UserContextData = {
    user: User | null;
    logout: () => void;
    login: (_email: string) => void;
};

const UserContext = createContext<UserContextData>({
    user: null,
    login: (_email) => null,
    logout: () => null,
});
export default UserContext;

export const UserContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    /**
     * Logs the user out of magic
     */
    const logout = useCallback(async () => {
        try {
            await m.user.logout();
            setUser(null);
        } catch (err) {
            // Do nothing
            setUser(user);
        }
    }, [user]);

    /**
     * Login with magic, enrich context with address and provider for convenience
     * @param email
     */
    const login = async (email: string) => {
        try {
            await m.auth.loginWithMagicLink({ email });
            setUser({
                email,
            });
        } catch (err) {
            logout();
        }
    };

    useEffect(() => {
        m = new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY || "");

        /**
         * Checks if the user is already logged in, if they are, log them in automatically
         * Used in browser refreshes
         */
        const persistUser = async () => {
            try {
                const isLoggedIn = await m.user.isLoggedIn();

                if (isLoggedIn) {
                    const { email } = await m.user.getMetadata();
                    setUser({
                        email: String(email),
                    });
                }
            } catch (err) {
                logout();
            }
        };
        persistUser();
    }, [logout]);

    return (
        <UserContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useLogin = () => {
    const { login } = useContext(UserContext);

    return login;
};

export const useLogout = () => {
    const { logout } = useContext(UserContext);

    return logout;
};

export const useUser = () => {
    const { user } = useContext(UserContext);

    return user;
};
