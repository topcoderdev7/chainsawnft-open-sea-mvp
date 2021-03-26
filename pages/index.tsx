import Head from "next/head";
import styles from "../styles/Index.module.scss";
import { API_URL } from "../utils/constants";
import { NFT, Slide } from "../types";
import Auctions from "../components/Auctions";
import Slider from "../components/Slider";

export const Home: React.FC<{ assets: NFT[]; slides: Slide[] }> = ({
    assets,
    slides,
}) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Chainsaw NFT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Slider slides={slides} />
            <Auctions assets={assets} />
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    const tokenRes = await fetch(`${API_URL}/tokens?_limit=-1`);
    const allTokens = await tokenRes.json();

    const slidesRes = await fetch(`${API_URL}/slider`);
    const sliderData = await slidesRes.json();

    // Populate artist data in slider
    const slidesWithoutArtists = sliderData.slides as Slide[];
    const sliderWithArtist = await Promise.all(
        slidesWithoutArtists.map(async (slide) => {
            if (slide?.token?.artist) {
                const artistRes = await fetch(
                    `${API_URL}/artists/${slide.token.artist}`,
                );
                const artist = await artistRes.json();
                // eslint-disable-next-line
                slide.token.artist = artist;
            }

            return slide;
        }),
    );

    const availableTokens: NFT[] = allTokens.filter((token) => !token.sold);
    const soldTokens = allTokens.filter((token) => token.sold);
    return {
        props: {
            assets: availableTokens
                .sort((a, b) => a.priority - b.priority)
                .reverse(),
            sold: soldTokens,
            slides: sliderWithArtist,
        },
    };
}
