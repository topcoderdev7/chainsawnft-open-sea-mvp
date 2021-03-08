import { BigNumber } from "ethers";
import { OpenSeaAsset } from "opensea-js/lib/types";

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
export type NFT = OpenSeaAsset;
