import { ethers } from "ethers";
import Head from "next/head";
import Link from "next/link";
import slugify from "slugify";
import Signup from "../components/Signup";
import styles from "../styles/Index.module.scss";
import { makeSeaport } from "../utils/seaport";
import { LIST_OF_TOKENS } from "../utils/constants";
import { getAsset } from "../utils/asset";
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
                {assets.map(({ description, imageUrl, name }) => (
                    <Link href={`/asset/${slugify(name)}`} key={name}>
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
    // Get seaport
    const seaport = makeSeaport(
        new ethers.providers.InfuraProvider(
            "homestead",
            process.env.NEXT_PUBLIC_INFURA_KEY,
        ),
    );

    // Fetch the assets through seaport
    const assets = await Promise.all(
        LIST_OF_TOKENS.map(
            async ({ address, id }: { address: string; id: string }) => {
                const result = await getAsset(seaport, address, id);
                return result;
            },
        ),
    );

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
