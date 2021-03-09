import { utils } from "ethers";
import useOrders from "../../hooks/useOrders";

import styles from "./Orders.module.scss";

const Orders: React.FC<{ address: string; tokenId: string }> = ({
    address,
    tokenId,
}) => {
    const { buyOrders, sellOrders, owner } = useOrders(address, tokenId);
    return (
        <div className={styles.orders}>
            <h3>List of orders</h3>
            {owner ? <p>Owned by {owner.address}</p> : ""}
            <h4>Buy Orders</h4>
            {buyOrders.map((buyOrder) => (
                <p>
                    Bid Placed by {buyOrder.makerAccount.address} Ξ
                    {utils.formatEther(buyOrder.basePrice.toString())} at{" "}
                    {new Date(
                        Number(buyOrder.listingTime.toString()) * 1000,
                    ).toString()}
                </p>
            ))}

            <div className={styles.orderList}>
                <h4>Sell Orders</h4>
                {sellOrders.map((sellOrder) => (
                    <p>Ξ{utils.formatEther(sellOrder.basePrice.toString())}</p>
                ))}
                {!sellOrders.length && <p>No orders yet</p>}
            </div>
        </div>
    );
};

export default Orders;
