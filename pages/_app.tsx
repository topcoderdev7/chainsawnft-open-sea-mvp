/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from "next/dist/next-server/lib/router/router";
import { UserContextProvider } from "../context/UserContext";

import "../styles/global.scss";
import Layout from "../components/Layout";
import AllowanceReminder from "../components/AllowanceReminder";
import { BalanceContextProvider } from "../context/BalanceContext";
import { ProfileContextProvider } from "../context/ProfileContext";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <UserContextProvider>
            <ProfileContextProvider>
                <BalanceContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                        <AllowanceReminder />
                    </Layout>
                </BalanceContextProvider>
            </ProfileContextProvider>
        </UserContextProvider>
    );
};

export default MyApp;
