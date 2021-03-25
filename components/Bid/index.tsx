import { utils } from "ethers";
import React from "react";
import { OrderFromAPI } from "../../types";
import styles from "./Bid.module.scss";

const Bid: React.FC<{ buyOrder: OrderFromAPI }> = ({ buyOrder }) => {
    const date = new Date(
        Number(buyOrder.listing_time.toString()) * 1000,
    ).toISOString();
    return (
        <div className={styles.bid}>
            <div>
                <p className={styles.bidder}>
                    Bid Placed by {buyOrder.maker.address}
                </p>
                <p className={styles.date}>at {date}</p>
            </div>

            <p className={styles.price}>
                {utils.formatEther(buyOrder.base_price.toString())} ETH
            </p>
        </div>
    );
};

export default Bid;
