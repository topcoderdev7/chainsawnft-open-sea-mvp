import Head from "next/head";
import styles from "../styles/Index.module.scss";
import { API_URL } from "../utils/constants";
import { Artist } from "../types";
import Artists from "../components/Artists";

export const ArtistsHome: React.FC<{ artists: Artist[] }> = ({ artists }) => {
    console.log(artists);
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Artists artists={artists} />
        </div>
    );
};

export default ArtistsHome;

export async function getStaticProps(context) {
    const artistRes = await fetch(`${API_URL}/artists`);
    const artists = await artistRes.json();

    return {
        props: {
            artists,
        },
    };
}
