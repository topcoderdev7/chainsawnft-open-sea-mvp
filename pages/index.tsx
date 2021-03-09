import { ethers } from "ethers";
import Head from "next/head";
import styles from "../styles/Index.module.scss";
import { API_URL } from "../utils/constants";
import { NFT } from "../types";
import Auctions from "../components/Auctions";

export const Home: React.FC<{ assets: NFT[] }> = ({ assets }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Auctions assets={assets} />
        </div>
    );
};

export default Home;

export async function getStaticProps(context) {
    const tokenRes = await fetch(`${API_URL}/tokens?_limit=-1`);
    const tokens = await tokenRes.json();

    return {
        props: {
            assets: tokens,
        },
    };
}
