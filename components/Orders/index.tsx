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
            <div className={styles.orderList}>
                <h4>Buy Orders</h4>
                {buyOrders.map((buyOrder) => (
                    <p>Ξ{utils.formatEther(buyOrder.basePrice.toString())}</p>
                ))}
                {!buyOrders.length && <p>No orders yet</p>}
            </div>

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
