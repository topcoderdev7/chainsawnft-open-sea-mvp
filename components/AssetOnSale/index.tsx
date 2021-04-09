import { utils } from "ethers";
import Link from "next/link";
import useAsset from "../../hooks/useAsset";
import { NFTFile } from "../../types";
import findMaxBid from "../../utils/findMaxBid";
import VideoPlayer from "../VideoPlayer";
import styles from "./AssetOnSale.module.scss";
import Countdown from "../Countdown";

const AssetOnSale: React.FC<{
    address: string;
    tokenId: string;
    description: string;
    imageUrl: string;
    name: string;
    slug: string;
    reserve: string;
    artist?: string;
    onSale?: boolean;
    file?: NFTFile;
    sold?: boolean;
    soldFor: string;
}> = ({
    address,
    tokenId,
    imageUrl,
    name,
    slug,
    reserve,
    artist,
    onSale,
    file,
    sold,
    soldFor,
}) => {
    const assetData = useAsset(address, tokenId);
    const salesOrder = assetData?.orders?.find((order) => order.side === 1); // Find sell order
    const currentBid = findMaxBid(assetData?.orders);
    return (
        <Link href={`/asset/${slug}`}>
            <a>
                <div className={styles.asset}>
                    <div className={styles.imageContainer}>
                        {file && file.type === "video" && file.link && (
                            <VideoPlayer playbackId={file.link} display />
                        )}
                        {!(file && file.type === "video" && file.link) && (
                            <img src={imageUrl} alt={name} />
                        )}
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>
                            <h2>{artist}</h2>
                            <h3>{name}</h3>
                        </div>

                        <div className={styles.ends}>
                            <h3>Auction Ends at</h3>
                            <p>
                                {salesOrder?.listing_time && onSale ? (
                                    <Countdown
                                        date={salesOrder?.listing_time * 1000}
                                    />
                                ) : (
                                    "---"
                                )}
                            </p>
                        </div>

                        <div className={styles.footer}>
                            {onSale && !sold && (
                                <div className={styles.buyButton}>
                                    <div>
                                        <button>Bid Now</button>
                                    </div>
                                    {currentBid > 0 && (
                                        <div>
                                            <h3>Current Bid</h3>
                                            <p>{currentBid} ETH</p>
                                        </div>
                                    )}
                                    {currentBid === 0 && (
                                        <div>
                                            <h3>Reserve price</h3>
                                            <p>{reserve} ETH</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {!onSale && (
                                <div className={styles.notAvail}>
                                    <h3>Price</h3>
                                    <h2>---</h2>
                                </div>
                            )}

                            {sold && (
                                <div>
                                    <h4>Sold for</h4>{" "}
                                    <h3>{utils.formatEther(soldFor)}</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default AssetOnSale;
