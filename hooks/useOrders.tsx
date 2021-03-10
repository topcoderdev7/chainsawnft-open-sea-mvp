import { ethers } from "ethers";
import { Order } from "opensea-js/lib/types";
import { useEffect, useState } from "react";
import { getAsset } from "../utils/asset";
import { makeSeaport } from "../utils/seaport";

/**
 * Custom hook that given an address and id, fetches buys and sell orders and returns them
 * @param address
 * @param id
 */
const useOrders = (address: string, tokenId: string) => {
    const [latestBuyOrders, setBuyOrders] = useState<Order[]>([]);
    const [latestSellOrders, setSellOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const seaport = makeSeaport(
                new ethers.providers.InfuraProvider(
                    "homestead",
                    process.env.NEXT_PUBLIC_INFURA_KEY,
                ),
            );
            const { buyOrders, sellOrders, owner } = await getAsset(
                seaport,
                address,
                tokenId,
            );
            setBuyOrders(buyOrders);
            setSellOrders(sellOrders);
        };
        fetchOrders();
    }, [address, tokenId]);

    return {
        buyOrders: latestBuyOrders,
        sellOrders: latestSellOrders,
    };
};

export default useOrders;
