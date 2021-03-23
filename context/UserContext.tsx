import { createContext, useState, useEffect, useContext } from "react";
import { ethers, providers } from "ethers";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { makeSeaport } from "../utils/seaport";
import useEagerConnect from "../hooks/useEagerConnect";
import { injected } from "../utils/connectors";

export interface User {
    address: string;
    provider: ethers.providers.Web3Provider;
    seaport: any;
}

type UserContextData = {
    user: User | null;
    login: () => Promise<void>;
};

const UserContext = createContext<UserContextData>({
    user: null,
    login: () => null,
});
export default UserContext;

export const UserContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEagerConnect(); // Adds users on first load
    const { activate, active, library } = useWeb3React();

    /** Login with metamask */
    const activateMetamask = async () => activate(injected);

    /**
     * Given the Magic Provider, return address and provider
     */
    const getAddressAndProvider = async (provider: providers.Web3Provider) => {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const seaport = makeSeaport();

        return { address, provider, seaport };
    };

    /**
     * On unlock set user
     */
    useEffect(() => {
        const fetchUser = async () => {
            if (active) {
                console.log("active", active);
                const res = await getAddressAndProvider(library);
                setUser(res);
            } else {
                setUser(null);
            }
        };
        fetchUser();
    }, [active, library]);

    /**
     * Login with Metamask
     */
    const login = async (): Promise<void> => {
        try {
            activateMetamask();
        } catch (err) {
            alert(`Exception in loggign in ${alert}`);
        }
        return null;
    };

    return (
        <UserContext.Provider
            value={{
                user,
                login,
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

export const useUser = () => {
    const { user } = useContext(UserContext);

    return user;
};
