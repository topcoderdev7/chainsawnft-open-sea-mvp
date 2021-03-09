import { utils } from "ethers";
import useOrders from "../../hooks/useOrders";
import Bid from "../Bid";

import styles from "./Orders.module.scss";

const Orders: React.FC<{ address: string; tokenId: string }> = ({
    address,
    tokenId,
}) => {
    const { buyOrders, sellOrders, owner } = useOrders(
        "0x495f947276749ce646f68ac8c248420045cb7b5e",
        "88170941023983939473756233746161686074440532447362694659937317918787680337921",
    );
    console.log(buyOrders, sellOrders);
    return (
        <div className={styles.orders}>
            <h3>List of orders</h3>
            <h4>Owner</h4>
            <div className={`${styles.ordersSection} ${styles.owner}`}>
                <p>{owner ? owner.address : "No owner yet"}</p>
            </div>
            <div className={styles.ordersSection}>
                <h4>Buy Orders</h4>
                {buyOrders.map((buyOrder) => (
                    <Bid buyOrder={buyOrder} />
                ))}
                {!buyOrders.length && <p>No orders yet</p>}
            </div>
            <div className={styles.ordersSection}>
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
