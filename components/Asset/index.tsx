import Link from "next/link";
import styles from "./Asset.module.scss";

const Asset: React.FC<{
    description: string;
    imageUrl: string;
    name: string;
    slug: string;
    reserve: string;
}> = ({ description, imageUrl, name, slug, reserve }) => (
    <Link href={`/asset/${slug}`}>
        <a>
            <div className={styles.asset}>
                <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={name} />
                </div>
                <div className={styles.info}>
                    <div>
                        <h3>{name}</h3>
                    </div>
                    <p>{description}</p>
                    {reserve && <span>Reserve price: {reserve}</span>}
                </div>
            </div>
        </a>
    </Link>
);

export default Asset;
