import { utils } from "ethers";
import useOrders from "../../hooks/useOrders";
import useOwner from "../../hooks/useOwner";
import Bid from "../Bid";

import styles from "./Orders.module.scss";

const Orders: React.FC<{ address: string; tokenId: string }> = ({
    address,
    tokenId,
}) => {
    const { buyOrders, sellOrders } = useOrders(address, tokenId);
    const owner = useOwner(address, tokenId);
    return (
        <div className={styles.orders}>
            <h3>List of orders</h3>
            <h4>Owner</h4>
            <div className={`${styles.ordersSection} ${styles.owner}`}>
                <p>{owner || "No owner yet"}</p>
            </div>
            <div className={styles.ordersSection}>
                <h4>Buy Orders</h4>
                {buyOrders.map((buyOrder) => (
                    <Bid key={buyOrder.hash} buyOrder={buyOrder} />
                ))}
                {!buyOrders.length && <p>No orders yet</p>}
            </div>
            <div className={styles.ordersSection}>
                <h4>Sell Orders</h4>
                {sellOrders.map((sellOrder) => (
                    <p key={sellOrder.hash}>
                        Ξ{utils.formatEther(sellOrder.basePrice.toString())}
                    </p>
                ))}
                {!sellOrders.length && <p>No orders yet</p>}
            </div>
        </div>
    );
};

export default Orders;
