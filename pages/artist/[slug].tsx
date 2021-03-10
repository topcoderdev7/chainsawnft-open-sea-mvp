import { API_URL } from "../../utils/constants";
import { Artist, Collection as CollectionInterface } from "../../types";
import Collection from "../../components/Collection";

import styles from "../../styles/artist.module.scss";

const SingleArtistPage: React.FC<{ artist: Artist }> = ({ artist }) => {
    return (
        <main className={styles.artist}>
            <div className={styles.header}>
                <div className={styles.imageContainer}>
                    <img src={artist.imageUrl} alt={artist.Name} />
                </div>
                <div className={styles.info}>
                    <div className={styles.left}>
                        <h1>{artist.Name}</h1>
                    </div>
                </div>
            </div>
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
            // We explicitly declare values because of serialization issues
            artist: {
                imageUrl: found.imageUrl,
                Name: found.Name,
                slug: found.slug,
                collections: found.collections,
            },
        },
    };
}
