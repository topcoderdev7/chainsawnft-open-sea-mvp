import { NFT } from "../../types";
import Asset from "../Asset";
import styles from "./Auctions.module.scss";

const Auctions: React.FC<{ assets: NFT[] }> = ({ assets }) => {
    return (
        <main className={styles.auctions}>
            <h1 className={styles.title}>live auctions</h1>
            <div className={styles.auctionsContainer}>
                {assets.map(({ description, imageUrl, name, slug }) => (
                    <Asset
                        key={name}
                        slug={slug}
                        description={description}
                        imageUrl={imageUrl}
                        name={name}
                    />
                ))}
            </div>
        </main>
    );
};

export default Auctions;
