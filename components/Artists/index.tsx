import { Artist as ArtistInterface } from "../../types";
import Artist from "../Artist";
import styles from "./Artists.module.scss";

const Auctions: React.FC<{ artists: ArtistInterface[] }> = ({ artists }) => {
    return (
        <main className={styles.auctions}>
            <h1 className={styles.title}>Artists</h1>
            <div className={styles.auctionsContainer}>
                {artists.map((artist: ArtistInterface) => (
                    <Artist
                        key={artist.id}
                        slug={artist.slug}
                        imageUrl={artist.imageUrl}
                        Name={artist.Name}
                    />
                ))}
            </div>
        </main>
    );
};

export default Auctions;
