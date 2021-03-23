import { OpenSeaAsset, Order } from "opensea-js/lib/types";

declare global {
    interface Window {
        ethereum?: any;
    }
}

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
    reserve: string;
}

/** STRAPI INTERFACES */
/**
 * Model definition for collection
 */
export interface Collection {
    id: string;
    name?: string;
    imageUrl?: string;
    artist?: Artist;
    assets: any[];
    slug?: string;
}

/**
 * Model definition for artist
 */
export interface Artist {
    id: string;
    Name?: string;
    slug?: string;
    imageUrl?: string;
    collections: Collection[];
}

/**
 * Model definition for profile
 */
export interface Profile {
    id: string;
    user?: any;
    username?: string;
    address?: string;
}
