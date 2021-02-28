import dynamic from "next/dynamic";
import { API_URL } from "../../utils/constants";
import Asset from "../../components/Asset";
import { NFT } from "../../types";

const BuyWidgetNoSsr = dynamic(() => import("../../components/BuyWidget"), {
    ssr: false,
});
const OrdersNoSsr = dynamic(() => import("../../components/Orders"), {
    ssr: false,
});

const SingleAssetPage: React.FC<{ asset: NFT }> = ({
    asset: { description, imageUrl, name, address, tokenId },
}) => {
    return (
        <div>
            <h2>Single Asset Page</h2>
            <Asset name={name} imageUrl={imageUrl} description={description} />
            <BuyWidgetNoSsr address={address} tokenId={tokenId} />
            <OrdersNoSsr address={address} tokenId={tokenId} />
        </div>
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
            },
        },
    };
}
