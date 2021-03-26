import { utils, BigNumber } from "ethers";
import { FormEvent, useMemo, useState } from "react";
import { useBalances } from "../../context/BalanceContext";
import { useUser } from "../../context/UserContext";
import { MAX_ETH } from "../../utils/constants";
import { fromStringToBN } from "../../utils/inputs";
import { wrapETH } from "../../utils/weth";

const ConvertToWETH = () => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const user = useUser();
    const { eth: ethBalance } = useBalances();

    const BNAmount = useMemo(() => fromStringToBN(amount, 18), [amount]);

    const convertEthToWeth = async (e: FormEvent) => {
        e.preventDefault();
        if (BNAmount.gt(ethBalance)) {
            alert("Too big");
        }
        setLoading(true);

        await wrapETH(BNAmount, user.provider.getSigner());
        setLoading(false);
    };

    const fromBNToString = (number: BigNumber) =>
        String(parseFloat(utils.formatEther(number.toString())));

    const dangerous = ethBalance.sub(BNAmount).lt(MAX_ETH);
    console.log("dangerous", dangerous);
    return (
        <div>
            <h3>Convert ETH to WETH </h3>
            {dangerous && (
                <p>
                    THIS SEEMS DANGEROUS, you probably have too little ETH to
                    continue
                </p>
            )}
            <form onSubmit={convertEthToWeth}>
                <input
                    type="number"
                    step="0.001"
                    value={amount}
                    max={fromBNToString(ethBalance)}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button disabled={loading} type="submit">
                    {loading ? "Loading" : "Wrap ETH"}
                </button>
            </form>
        </div>
    );
};
export default ConvertToWETH;
