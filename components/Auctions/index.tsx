import { NFT } from "../../types";
import Asset from "../Asset";
import styles from "./Auctions.module.scss";

const Auctions: React.FC<{ assets: NFT[] }> = ({ assets }) => {
    return (
        <main className={styles.auctions}>
            <div className={styles.headline}>
                <div className={styles.title}>
                    <img alt="Live Auctions" src="/images/Auctions.png" />
                </div>
                <div className={styles.divider}>
                    <hr />
                </div>
                <div className={styles.rightLink} />
            </div>
            <div className={styles.auctionsContainer}>
                {assets.map(
                    ({
                        description,
                        imageUrl,
                        name,
                        slug,
                        reserve,
                        artist,
                        onSale,
                        file,
                    }) => (
                        <Asset
                            onSale={onSale}
                            artist={artist?.name}
                            key={name}
                            slug={slug}
                            description={description}
                            imageUrl={imageUrl}
                            name={name}
                            reserve={reserve}
                            file={file}
                        />
                    ),
                )}
            </div>
        </main>
    );
};

export default Auctions;
