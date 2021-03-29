import MarkdownRenderer from "react-markdown-renderer";
import { API_URL } from "../../utils/constants";
import { Artist, Collection as CollectionInterface } from "../../types";
import Collection from "../../components/Collection";

import styles from "../../styles/artist.module.scss";
import Auctions from "../../components/Auctions";

const SingleArtistPage: React.FC<{ artist: Artist }> = ({ artist }) => {
    return (
        <main className={styles.artist}>
            <div className={styles.header}>
                <div className={styles.imageContainer} />
                <div className={styles.info}>
                    <h1>{artist.name}</h1>
                    <div className={styles.extraInfo}>
                        <h2>{artist?.extraTitle}</h2>
                        {artist?.extraContent && (
                            <MarkdownRenderer markdown={artist.extraContent} />
                        )}
                    </div>
                </div>
            </div>
            {artist?.collections?.length > 0 && (
                <div className={styles.collections}>
                    <h3>Collections ({artist.collections.length}): </h3>
                    <div className={styles.collectionsContainer}>
                        {artist.collections.map(
                            (collection: CollectionInterface) => (
                                <Collection
                                    key={collection.slug}
                                    imageUrl={collection.imageUrl}
                                    name={collection.name}
                                    slug={collection.slug}
                                    id={collection.id}
                                    assets={collection.assets}
                                />
                            ),
                        )}
                    </div>
                </div>
            )}

            {artist?.tokens?.length && <Auctions assets={artist.tokens} />}
        </main>
    );
};

export default SingleArtistPage;

export async function getStaticPaths() {
    const artistRes = await fetch(`${API_URL}/artists?_limit=-1`);
    const artists = await artistRes.json();

    return {
        paths: artists.map((artist: Artist) => ({
            params: { slug: artist.slug },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const artistRes = await fetch(`${API_URL}/artists?slug=${params.slug}`);
    const artist = await artistRes.json();
    const found = artist[0];
    return {
        props: {
            artist: found,
        },
    };
}
