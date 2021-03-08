/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from "next/dist/next-server/lib/router/router";
import { UserContextProvider } from "../context/UserContext";

import "../styles/global.scss";
import Layout from "../components/Layout";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <UserContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserContextProvider>
    );
};

export default MyApp;
