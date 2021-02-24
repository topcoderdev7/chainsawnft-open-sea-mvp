import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { BuyOrder, SellOrder } from "../types";
import { getAsset } from "../utils/asset";
import { makeSeaport } from "../utils/seaport";

/**
 * Custom hook that given an address and id, fetches buys and sell orders and returns them
 * @param address
 * @param id
 */
const useOrders = (address: string, id: string) => {
    const [latestBuyOrders, setBuyOrders] = useState<BuyOrder[]>([]);
    const [latestSellOrders, setSellOrders] = useState<SellOrder[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const seaport = makeSeaport(
                new ethers.providers.InfuraProvider(
                    "homestead",
                    process.env.NEXT_PUBLIC_INFURA_KEY,
                ),
            );
            const { buyOrders, sellOrders } = await getAsset(
                seaport,
                address,
                id,
            );
            setBuyOrders(buyOrders);
            setSellOrders(sellOrders);
        };
        fetchOrders();
    }, [address, id]);

    return { buyOrders: latestBuyOrders, sellOrders: latestSellOrders };
};

export default useOrders;
