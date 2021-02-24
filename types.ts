export interface BuyOrder {
    hash: string;
    paymentTokenContract: {
        ethPrice: string; // The price in ETH
        usdPrice: string;
    };
}

export interface SellOrder {
    hash: string;
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
    buyOrders: BuyOrder[];
    sellOrders: SellOrder[];
}
