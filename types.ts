import { BigNumber } from "ethers";

export interface BuyOrder {
    hash: string;
    basePrice: BigNumber;
    paymentTokenContract: {
        ethPrice: string; // The price in ETH
        usdPrice: string;
    };
}

export interface SellOrder {
    hash: string;
    basePrice: BigNumber;
    paymentTokenContract: {
        ethPrice: string; // The price in ETH
        usdPrice: string;
    };
}

/**
 * Interface for an NFT retrieved from seaport.api.getAsset
 */
export interface NFT {
    description: string;
    imageUrl: string;
    name: string;
    address: string;
    tokenId: string;

    slug: string;

    buyOrders: BuyOrder[];
    sellOrders: SellOrder[];
}
