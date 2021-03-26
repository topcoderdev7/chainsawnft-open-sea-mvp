import { NFT } from "../../types";
import Asset from "../Asset";
import styles from "./Auctions.module.scss";

const Auctions: React.FC<{ assets: NFT[] }> = ({ assets }) => {
    return (
        <main className={styles.auctions}>
            {/* <h1 className={styles.title}>live auctions</h1> */}
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
