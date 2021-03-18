import { utils } from "ethers";
import React from "react";
import { BuyOrder } from "../../types";
import styles from "./Bid.module.scss";

const Bid: React.FC<{ buyOrder: BuyOrder }> = ({ buyOrder }) => {
    const date = new Date(
        Number(buyOrder.listingTime.toString()) * 1000,
    ).toISOString();

    return (
        <div className={styles.bid}>
            <div>
                <p className={styles.bidder}>
                    Bid Placed by {buyOrder.makerAccount.address}
                </p>
                <p className={styles.date}>at {date}</p>
            </div>

            <p className={styles.price}>
                {utils.formatEther(buyOrder.basePrice.toString())}
            </p>
        </div>
    );
};

export default Bid;
