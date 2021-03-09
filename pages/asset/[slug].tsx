import dynamic from "next/dynamic";
import { API_URL } from "../../utils/constants";
import { NFT } from "../../types";

import styles from "../../styles/asset.module.scss";

const BuyWidgetNoSsr = dynamic(() => import("../../components/BuyWidget"), {
    ssr: false,
});
const OrdersNoSsr = dynamic(() => import("../../components/Orders"), {
    ssr: false,
});

const SingleAssetPage: React.FC<{ asset: NFT }> = ({ asset }) => {
    return (
        <main className={styles.singleAsset}>
            <div className={styles.imageContainer}>
                <img src={asset.imageUrl} alt={asset.name} />
            </div>
            <div className={styles.info}>
                <div className={styles.left}>
                    <h1>{asset.name}</h1>
                    <p>Description:</p>
                    <span>{asset.description}</span>
                    <p>More info:</p>
                    <ul>
                        <li>
                            Published:{" "}
                            {new Date(asset.publishedAt).toLocaleDateString()}
                        </li>
                    </ul>
                </div>
                <div className={styles.right}>
                    <BuyWidgetNoSsr
                        address={asset.address}
                        tokenId={asset.tokenId}
                    />
                    <OrdersNoSsr
                        address={asset.address}
                        tokenId={asset.tokenId}
                    />
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
            // We explicitly declare values because of serialization issues
            asset: {
                description: found.description,
                imageUrl: found.imageUrl,
                name: found.name,
                address: found.address,
                tokenId: found.tokenId,
                publishedAt: found.published_at,
            },
        },
    };
}
