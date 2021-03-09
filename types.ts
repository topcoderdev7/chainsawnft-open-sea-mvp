import { OpenSeaAsset, Order } from "opensea-js/lib/types";

export type BuyOrder = Order;

export type SellOrder = Order;

/**
 * Interface for an NFT retrieved from seaport.api.getAsset
 */
export interface NFT extends OpenSeaAsset {
    description: string;
    imageUrl: string;
    name: string;
    address: string;
    tokenId: string;

    slug: string;
}
