import dynamic from "next/dynamic";
import { useState } from "react";
import { Order } from "opensea-js/lib/types";
import Link from "next/link";
import { API_URL } from "../../utils/constants";
import { NFT, OrderFromAPI } from "../../types";

import styles from "../../styles/asset.module.scss";
import useAsset from "../../hooks/useAsset";
import Modal from "../../components/Modal";
import findMaxBid from "../../utils/findMaxBid";
import useOwner from "../../hooks/useOwner";
import useRelatedAssets from "../../hooks/useRelatedAssets";
import { useUser } from "../../context/UserContext";

const BuyWidgetNoSsr = dynamic(() => import("../../components/BuyWidget"), {
    ssr: false,
});
const OrdersNoSsr = dynamic(() => import("../../components/Orders"), {
    ssr: false,
});

const OrderModal: React.FC<{
    handleClose: () => void;
    buyOrders: OrderFromAPI[];
    address: string;
    tokenId: string;
}> = ({ handleClose, buyOrders, address, tokenId }) => (
    <Modal handleClose={handleClose}>
        <BuyWidgetNoSsr
            handleClose={handleClose}
            buyOrders={buyOrders}
            sellOrders={[]}
            address={address}
            tokenId={tokenId}
        />
    </Modal>
);

const SingleAssetPage: React.FC<{ asset: NFT }> = ({ asset }) => {
    const user = useUser();
    const assetData = useAsset(asset.address, asset.tokenId);
    const [modalOpen, setModalOpen] = useState(false);

    const related = useRelatedAssets(asset);
    console.log("related", related);
    const salesOrder = assetData?.orders.find((order) => order.side === 1); // Find sell order
    const currentBid = findMaxBid(assetData?.orders);
    console.log("assetData?.orders", assetData?.orders);
    const owner = useOwner(assetData);

    return (
        <main className={styles.singleAsset}>
            <div className={styles.masthead}>
                <div
                    className={styles.imageBg}
                    style={{ backgroundImage: `url(${asset.imageUrl})` }}
                />
                <div className={styles.assetMastHead}>
                    <div className={styles.imageContainer}>
                        <img src={asset.imageUrl} alt={asset.name} />
                    </div>
                    <div>
                        <div className={styles.details}>
                            <h2 className={styles.artist}>
                                {asset?.artist?.name}
                            </h2>
                            <h2 className={styles.name}>{asset.name}</h2>

                            <div className={styles.auction}>
                                <div>
                                    <h3>Current Bid</h3>
                                    <p>{currentBid}</p>
                                </div>
                                {salesOrder?.closing_date && (
                                    <div>
                                        <h3>Auction Ends at</h3>
                                        <p>{salesOrder.closing_date}</p>
                                    </div>
                                )}
                            </div>
                            {user && (
                                <button
                                    className={styles.bidButton}
                                    onClick={() => setModalOpen(true)}
                                    type="button"
                                >
                                    Bid Now
                                </button>
                            )}

                            {!user && (
                                <Link href="/login">
                                    <button
                                        className={styles.bidButton}
                                        type="button"
                                    >
                                        Bid Now
                                    </button>
                                </Link>
                            )}

                            {modalOpen && (
                                <OrderModal
                                    buyOrders={assetData?.orders || []}
                                    handleClose={() => setModalOpen(false)}
                                    address={asset.address}
                                    tokenId={asset.tokenId}
                                />
                            )}
                            <div className={styles.description}>
                                <h3>Description</h3>
                                <span>{asset.description}</span>
                            </div>

                            <div className={styles.owner}>
                                <h3>Owner</h3>
                                <div>
                                    <span>{owner || "No owner yet"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.left}>
                    <h2>
                        {asset?.artist?.name
                            ? `More Works from ${asset.artist.name}`
                            : "More works"}{" "}
                    </h2>
                    <div className={styles.relatedGrid}>
                        {related.map((token) => (
                            <Link href={`/asset/${token.slug}`}>
                                <a>
                                    <img
                                        src={token.imageUrl}
                                        alt={token.name}
                                    />
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.right}>
                    <OrdersNoSsr asset={assetData} />
                </div>
            </div>
        </main>
    );
};

export default SingleAssetPage;

export async function getStaticPaths() {
    const tokenRes = await fetch(`${API_URL}/tokens?_limit=-1`);
    const tokens = await tokenRes.json();

    return {
        paths: tokens.map((asset) => ({
            params: { slug: asset.slug },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const tokenRes = await fetch(`${API_URL}/tokens?slug=${params.slug}`);
    const tokens = await tokenRes.json();
    const found = tokens[0];
    return {
        props: {
            asset: found,
        },
    };
}
