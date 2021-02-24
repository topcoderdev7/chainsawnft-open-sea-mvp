import { ethers } from "ethers";
import slugify from "slugify";
import dynamic from "next/dynamic";
import { makeSeaport } from "../../utils/seaport";
import { LIST_OF_TOKENS } from "../../utils/constants";
import { getAsset } from "../../utils/asset";
import Asset from "../../components/Asset";
import { NFT } from "../../types";

const BuyWidgetNoSsr = dynamic(() => import("../../components/Orders"), {
    ssr: false,
});
const OrdersNoSsr = dynamic(() => import("../../components/BuyWidget"), {
    ssr: false,
});

const SingleAssetPage: React.FC<{ asset: NFT }> = ({
    asset: { description, imageUrl, name, address, id },
}) => {
    return (
        <div>
            <h2>Single Asset Page</h2>
            <Asset name={name} imageUrl={imageUrl} description={description} />
            <BuyWidgetNoSsr address={address} id={id} />
            <OrdersNoSsr address={address} id={id} />
        </div>
    );
};

export default SingleAssetPage;

export async function getStaticPaths() {
    // Get seaport
    const seaport = makeSeaport(
        new ethers.providers.InfuraProvider(
            "homestead",
            process.env.NEXT_PUBLIC_INFURA_KEY,
        ),
    );

    // Fetch the assets through seaport
    const assets = await Promise.all(
        LIST_OF_TOKENS.map(
            async ({ address, id }: { address: string; id: string }) => {
                const result = await getAsset(seaport, address, id);
                return result;
            },
        ),
    );

    return {
        paths: assets.map((asset) => ({
            params: { slug: slugify(asset.name) },
        })),
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    console.log("params", params);
    // Get seaport
    const seaport = makeSeaport(
        new ethers.providers.InfuraProvider(
            "homestead",
            process.env.NEXT_PUBLIC_INFURA_KEY,
        ),
    );

    // Fetch the assets through seaport
    const assets = await Promise.all(
        LIST_OF_TOKENS.map(
            async ({ address, id }: { address: string; id: string }) => {
                const result = await getAsset(seaport, address, id);
                return result;
            },
        ),
    );

    const found = assets.find((asset) => slugify(asset.name) === params.slug);

    return {
        props: {
            // We explicitly declare values because of serialization issues
            asset: {
                description: found.description,
                imageUrl: found.imageUrl,
                name: found.name,
                address: found.address,
                id: found.id,
            },
        },
    };
}
