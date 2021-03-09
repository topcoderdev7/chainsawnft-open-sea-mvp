import { FormEvent, useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import useOrders from "../../hooks/useOrders";
import { bid } from "../../utils/bid";

import styles from "./BuyWidget.module.scss";

const BuyWidget: React.FC<{ address: string; tokenId: string }> = ({
    address,
    tokenId,
}) => {
    const { buyOrders, sellOrders } = useOrders(address, tokenId);
    const user = useUser();

    const [amount, setAmount] = useState("");
    // Find max ETH VALUE

    useEffect(() => {
        const findMax = () => {
            let max = 0;
            buyOrders.forEach((buyOrder) => {
                if (parseFloat(buyOrder.paymentTokenContract.ethPrice) > max) {
                    max = parseFloat(buyOrder.paymentTokenContract.ethPrice);
                }
            });
            sellOrders.forEach((sellOrder) => {
                if (parseFloat(sellOrder.paymentTokenContract.ethPrice) > max) {
                    max = parseFloat(sellOrder.paymentTokenContract.ethPrice);
                }
            });
            setAmount(String(max));
        };
        findMax();
    }, [buyOrders, sellOrders]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        /// TODO BID
        // USER SEAPORT
        const tx = await bid(
            user.seaport,
            address,
            tokenId,
            "ERC1155",
            user.address,
            parseFloat(amount || "0"),
        );
    };

    const fromETHToUsd = (ethAmount: string) => parseFloat(ethAmount) * 2;

    return (
        <div className={styles.purchase}>
            <h3>Buy</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    step="0.001"
                    value={amount}
                    onChange={(e: any) => setAmount(e.target.value)}
                />
                <input
                    disabled
                    type="hidden"
                    step="0.001"
                    value={fromETHToUsd(amount)}
                />
                <div className={styles.buttonContainer}>
                    <span>{fromETHToUsd(amount)}$</span>
                    <button>Buy</button>
                </div>
            </form>
        </div>
    );
};

export default BuyWidget;
