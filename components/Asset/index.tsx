import Link from "next/link";
import styles from "./Asset.module.scss";

const Asset: React.FC<{
    description: string;
    imageUrl: string;
    name: string;
    slug: string;
    reserve: string;
    artist: string;
}> = ({ imageUrl, name, slug, reserve, artist }) => (
    <Link href={`/asset/${slug}`}>
        <a>
            <div className={styles.asset}>
                <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={name} />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>
                        <h2>{artist}</h2>
                        <h3>{name}</h3>
                    </div>
                    <div className={styles.footer}>
                        <div>
                            <button>Bid Now</button>
                        </div>
                        {reserve && (
                            <div>
                                <h4>Reserve price:</h4> <h3>{reserve}</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </a>
    </Link>
);

export default Asset;
