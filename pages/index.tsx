import { ethers } from "ethers";
import Head from "next/head";
import { stringify } from "querystring";
import Signup from "../components/Signup";
import styles from "../styles/Index.module.scss";
import { makeSeaport } from "../utils/seaport";
import { LIST_OF_TOKENS } from "../utils/constants";
import { getAsset } from "../utils/asset";
import Asset from "../components/Asset";

export const Home = ({ assets }): JSX.Element => {
    console.log("assets", assets);
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Signup />
                {assets.map(({ description, imageUrl, name }) => (
                    <Asset
                        description={description}
                        imageUrl={imageUrl}
                        name={name}
                    />
                ))}
            </main>
        </div>
    );
};

export default Home;

export async function getStaticProps(context) {
    // Get seaport
    const seaport = makeSeaport(
        new ethers.providers.InfuraProvider(
            "homestead",
            "6a62f311d4e04880945ba1dc8424690a",
        ),
    );

    console.log("seaport", seaport);

    // Fetch the assets through seaport
    const assets = await Promise.all(
        LIST_OF_TOKENS.map(
            async ({ address, id }: { address: string; id: string }) => {
                const result = await getAsset(seaport, address, id);
                return result;
            },
        ),
    );

    console.log("assets", assets);

    return {
        props: {
            assets: assets.map(
                ({ buyOrders, description, imageUrl, name, sellOrders }) => ({
                    buyOrders: buyOrders.map(
                        ({
                            hash,
                            paymentTokenContract: { ethPrice, usdPrice },
                        }) => ({
                            hash,
                            ethPrice,
                            usdPrice,
                        }),
                    ),
                    description,
                    imageUrl,
                    name,
                    sellOrders: sellOrders.map(
                        ({
                            hash,
                            paymentTokenContract: { ethPrice, usdPrice },
                        }) => ({
                            hash,
                            ethPrice,
                            usdPrice,
                        }),
                    ),
                }),
            ),
        }, // will be passed to the page component as props
    };
}
