import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { makeSeaport } from "../../utils/seaport";
import { getAsset } from "../../utils/asset";
import { BuyOrder, SellOrder } from "../../types";

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

const Orders: React.FC<{ address: string; id: string }> = ({ address, id }) => {
    console.log("address", address);
    console.log("id", id);
    const { buyOrders, sellOrders } = useOrders(address, id);
    return (
        <div>
            <h3>List of orders</h3>
            <h4>Buy Orders</h4>
            {buyOrders.map((buyOrder) => (
                <p>${buyOrder.paymentTokenContract.usdPrice}</p>
            ))}

            <h4>Sell Orders</h4>
            {sellOrders.map((sellOrder) => (
                <p>${sellOrder.paymentTokenContract.usdPrice}</p>
            ))}
        </div>
    );
};

export default Orders;
