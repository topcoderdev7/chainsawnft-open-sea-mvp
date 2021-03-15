/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from "next/dist/next-server/lib/router/router";
import { UserContextProvider } from "../context/UserContext";

import "../styles/global.scss";
import Layout from "../components/Layout";
import { BalanceContextProvider } from "../context/BalanceContext";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <UserContextProvider>
            <BalanceContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </BalanceContextProvider>
        </UserContextProvider>
    );
};

export default MyApp;
