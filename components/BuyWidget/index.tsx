import { FormEvent, useEffect, useMemo, useState } from "react";
import { utils } from "ethers";
import { useUser } from "../../context/UserContext";
import useOrders from "../../hooks/useOrders";
import { bid } from "../../utils/bid";
import { fromStringToBN } from "../../utils/inputs";

import styles from "./BuyWidget.module.scss";
import { useBalances } from "../../context/BalanceContext";
import LoadingModal from "../LoadingModal";
import ResultModal from "../ResultModal";

const BuyWidget: React.FC<{ address: string; tokenId: string }> = ({
    address,
    tokenId,
}) => {
    const { buyOrders, sellOrders, reload: reloadOrders } = useOrders(
        address,
        tokenId,
    );

    const user = useUser();
    const { weth: wethBalance } = useBalances();

    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        error: boolean;
        message: string;
    } | null>(null);

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
                if (parseFloat(sellOrder.basePrice.toString()) > max) {
                    max = parseFloat(
                        utils.formatEther(sellOrder.basePrice.toString()),
                    );
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
        setLoading(true);
        // USER SEAPORT
        try {
            const tx = await bid(
                user.seaport,
                address,
                tokenId,
                "ERC1155",
                user.address,
                parseFloat(amount || "0"),
            );
            setResult({
                error: false,
                message:
                    "Success! The order went through! It takes up to 1 minute for the order to show",
            });
            await reloadOrders();
        } catch (err) {
            setResult({
                error: true,
                message: err.message ? err.message.toString() : err.toString(),
            });
        }
        setLoading(false);
    };

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
                <div className={styles.buttonContainer}>
                    <button disabled={loading}>
                        {loading ? "Loading" : "Buy"}
                    </button>
                </div>
            </form>
            {loading && <LoadingModal />}
            {result && (
                <ResultModal
                    handleClose={() => setResult(null)}
                    result={result}
                />
            )}
        </div>
    );
};

export default BuyWidget;
