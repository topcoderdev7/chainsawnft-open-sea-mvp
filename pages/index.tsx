import { ethers } from "ethers";
import Head from "next/head";
import Link from "next/link";
import Signup from "../components/Signup";
import styles from "../styles/Index.module.scss";
import { API_URL } from "../utils/constants";
import Asset from "../components/Asset";
import { NFT } from "../types";

export const Home: React.FC<{ assets: NFT[] }> = ({ assets }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Signup />
                {assets.map(({ description, imageUrl, name, slug }) => (
                    <Link href={`/asset/${slug}`} key={name}>
                        <a>
                            <Asset
                                description={description}
                                imageUrl={imageUrl}
                                name={name}
                            />
                        </a>
                    </Link>
                ))}
            </main>
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
