import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.scss";
import { API_URL, TOKENS_PER_PAGE } from "../utils/constants";
import { NFT, Slide } from "../types";
import Auctions from "../components/Auctions";
import Slider from "../components/Slider";
import HeadWithImage from "../components/HeadWithImage";

export const Home: React.FC<{
    assets: NFT[];
    slides: Slide[];
    hasMore: boolean;
}> = ({ assets, slides, hasMore }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Chainsaw NFT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeadWithImage />
            <Slider slides={slides} />
            <Auctions assets={assets} />
            <div className={styles.pageLink}>
                {hasMore && (
                    <Link href="/page/1">
                        <a>Next Page</a>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    const pageNumber = 0;
    const page = pageNumber * TOKENS_PER_PAGE;
    const nextPage = page + TOKENS_PER_PAGE;

    const tokenRes = await fetch(
        `${API_URL}/tokens?_limit=${TOKENS_PER_PAGE}&_sort=priority:DESC`,
    );
    const allTokens = await tokenRes.json();

    let slides = [];
    try {
        const slidesRes = await fetch(`${API_URL}/slider`);
        const sliderData = await slidesRes.json();
        slides = sliderData.slides as Slide[];
    } catch (err) {
        console.log("Exception in loading slides, defaulting to empty list");
    }

    const tokenCountRes = await fetch(`${API_URL}/tokens/count`);
    const count = await tokenCountRes.json();

    const hasMore = count / nextPage > 1;

    const availableTokens: NFT[] = allTokens.filter((token) => !token.sold);
    const soldTokens = allTokens.filter((token) => token.sold);
    return {
        props: {
            assets: availableTokens
                .sort((a, b) => a.priority - b.priority)
                .reverse(),
            sold: soldTokens,
            slides,
            hasMore,
        },
    };
}
