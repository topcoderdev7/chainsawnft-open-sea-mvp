import { FormEvent, useEffect, useMemo, useState } from "react";
import { utils } from "ethers";
import { useUser } from "../../context/UserContext";
import useOrders from "../../hooks/useOrders";
import { bid } from "../../utils/bid";
import { fromStringToBN } from "../../utils/inputs";

import styles from "./BuyWidget.module.scss";
import { useBalances } from "../../context/BalanceContext";

enum Status {
    Wrapping = 0,
    Sending,
}

const BuyWidget: React.FC<{ address: string; tokenId: string }> = ({
    address,
    tokenId,
}) => {
    const { buyOrders, sellOrders } = useOrders(address, tokenId);
    const user = useUser();
    const { weth: wethBalance } = useBalances();

    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<Status | null>(null);

    // Find max ETH VALUE
    useEffect(() => {
        const findMax = () => {
            let max = 0;
            buyOrders.forEach((buyOrder) => {
                if (parseFloat(buyOrder.basePrice.toString()) > max) {
                    max = parseFloat(
                        utils.formatEther(buyOrder.basePrice.toString()),
                    );
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

    // Convert input to BN so we can use with Ethers
    const BNAmount = useMemo(() => fromStringToBN(amount, 18), [amount]);

    /**
     * Calculate if we need more WETH, wrap that
     * @param e
     * @returns
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Check Weth Balance, wrap enough to get to X
        const needed = BNAmount.sub(wethBalance);
        if (needed.gt(0)) {
            // Wrap more WETH
            alert(`You need more weth ${needed.toString()}`);
            return;
        }
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
                    onChange={(e) => setAmount(e.target.value)}
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
