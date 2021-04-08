import Link from "next/link";
import { NFT } from "../../types";
import Asset from "../Asset";
import AssetOnSale from "../AssetOnSale";
import styles from "./Auctions.module.scss";

const Auctions: React.FC<{ assets: NFT[]; title?: string; link?: string }> = ({
    assets,
    title,
    link,
}) => {
    return (
        <main className={styles.auctions}>
            <div className={styles.headline}>
                <div className={styles.title}>
                    {title ? (
                        <h2>{title}</h2>
                    ) : (
                        <img alt="Live Auctions" src="/images/Auctions.png" />
                    )}
                </div>
                <div className={styles.divider}>
                    <hr />
                </div>
                <div className={styles.rightLink}>
                    {link && <Link href={link}>View All</Link>}
                </div>
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
                        sold,
                        soldFor,
                        address,
                        tokenId,
                    }) => (
                        <>
                            {onSale && !sold ? (
                                <AssetOnSale
                                    address={address}
                                    tokenId={tokenId}
                                    onSale={onSale}
                                    artist={artist?.name}
                                    key={name}
                                    sold={sold}
                                    soldFor={soldFor}
                                    slug={slug}
                                    description={description}
                                    imageUrl={imageUrl}
                                    name={name}
                                    reserve={reserve}
                                    file={file}
                                />
                            ) : (
                                <Asset
                                    onSale={onSale}
                                    artist={artist?.name}
                                    key={name}
                                    sold={sold}
                                    soldFor={soldFor}
                                    slug={slug}
                                    description={description}
                                    imageUrl={imageUrl}
                                    name={name}
                                    reserve={reserve}
                                    file={file}
                                />
                            )}
                        </>
                    ),
                )}
            </div>
        </main>
    );
};

export default Auctions;
