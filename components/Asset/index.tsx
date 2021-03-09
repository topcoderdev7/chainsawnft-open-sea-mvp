import Link from "next/link";
import styles from "./Asset.module.scss";

const Asset: React.FC<{
    description: string;
    imageUrl: string;
    name: string;
    slug: string;
}> = ({ description, imageUrl, name, slug }) => (
    <div className={styles.asset}>
        <div className={styles.imageContainer}>
            <img src={imageUrl} alt={name} />
        </div>
        <div className={styles.info}>
            <div>
                <Link href={`/asset/${slug}`}>
                    <a>
                        <h3>{name}</h3>
                    </a>
                </Link>
            </div>
            <Link href={`/asset/${slug}`}>
                <a>
                    <p>{description}</p>
                </a>
            </Link>
            <span>Reserve price: 1.2 ETH</span>
        </div>
    </div>
);

export default Asset;
