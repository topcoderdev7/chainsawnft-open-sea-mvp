import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.scss";
import {
    API_URL,
    AVAILABLE_TOKENS_QUERY,
    SOLD_TOKENS_IN_HOME,
    SOLD_TOKENS_QUERY,
    TOKENS_IN_HOME,
    UPCOMING_TOKENS_QUERY,
    UPCOMING_TOKENS_IN_HOME,
} from "../utils/constants";
import { NFT, Slide } from "../types";
import Auctions from "../components/Auctions";
import Slider from "../components/Slider";
import HeadWithImage from "../components/HeadWithImage";

export const Home: React.FC<{
    assets: NFT[];
    sold: NFT[];
    upcoming: NFT[];
    slides: Slide[];
}> = ({ assets, slides, sold, upcoming }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Chainsaw NFT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeadWithImage />
            <Slider slides={slides} />
            <Auctions assets={assets} />
            <h2>Sold</h2>
            <Auctions assets={sold} />
            <h2>Upcoming</h2>
            <Auctions assets={upcoming} />
            <div className={styles.pageLink}>
                <Link href="/auctions/0">
                    <a>All Auctions</a>
                </Link>
            </div>
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    const availableTokenRes = await fetch(
        `${API_URL}/tokens?_limit=${TOKENS_IN_HOME}&${AVAILABLE_TOKENS_QUERY}`,
    );
    const availableTokens = await availableTokenRes.json();

    const soldTokensRes = await fetch(
        `${API_URL}/tokens?_limit=${SOLD_TOKENS_IN_HOME}&${SOLD_TOKENS_QUERY}`,
    );
    const sold = await soldTokensRes.json();

    const upcomingTokensRes = await fetch(
        `${API_URL}/tokens?_limit=${UPCOMING_TOKENS_IN_HOME}&${UPCOMING_TOKENS_QUERY}`,
    );
    const upcoming = await upcomingTokensRes.json();

    let slides = [];
    try {
        const slidesRes = await fetch(`${API_URL}/slider`);
        const sliderData = await slidesRes.json();
        slides = sliderData.slides as Slide[];
    } catch (err) {
        console.log("Exception in loading slides, defaulting to empty list");
    }

    return {
        props: {
            assets: availableTokens,
            sold,
            upcoming,
            slides,
        },
    };
}
