import Link from "next/link";
import styles from "./Artist.module.scss";

const Artist: React.FC<{
    imageUrl: string;
    Name: string;
    slug: string;
}> = ({ imageUrl, Name, slug }) => (
    <Link href={`/artist/${slug}`}>
        <a>
            <div className={styles.artist}>
                <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={Name} />
                </div>
                <div className={styles.info}>
                    <h3>{Name}</h3>
                </div>
            </div>
        </a>
    </Link>
);

export default Artist;
