import { utils } from "ethers";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";
import { MAX_ETH } from "../../utils/constants";
import { addWETHAllowance, wrapETH } from "../../utils/weth";
import { useAllowance, useBalances } from "../../context/BalanceContext";
import styles from "../../styles/landing.module.scss";

const WETHPage: React.FC = () => {
    const user = useUser();
    const { eth: ethBalance, weth: wethBalance } = useBalances();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const allowance = useAllowance();

    const approveWETH = async () => {
        setLoading(true);
        await addWETHAllowance(user.seaport, user.address);

        setLoading(false);
    };

    const convertEthToWeth = async () => {
        setLoading(true);
        await wrapETH(ethBalance.sub(MAX_ETH), user.provider.getSigner());
        setLoading(false);
        router.push("/onboarding/success");
    };

    if (!user) {
        return <div>Please login</div>;
    }

    return (
        <div className={styles.container}>
            {!allowance && (
                <div>
                    <h2>PART 1 Approve WETH</h2>
                    <p>
                        Approve the Router so it can spend your WETH to bid on
                        art
                    </p>
                    {ethBalance.gt(MAX_ETH) && (
                        <button disabled={loading} onClick={approveWETH}>
                            {loading ? "Approving. Please Wait" : "Approve"}
                        </button>
                    )}
                </div>
            )}

            {allowance && (
                <div>
                    <h2>PART 2 Approve ETH to WETH</h2>
                    <p>
                        We&rsquo;ll wrap your ETH into WETH and you can start
                        trading NOTE: This can take up to 1 minute
                    </p>
                    {ethBalance.gt(MAX_ETH) && (
                        <button disabled={loading} onClick={convertEthToWeth}>
                            {loading ? "Approving. Please Wait" : "Approve"}
                        </button>
                    )}
                    <p>Current ETH Balance {utils.formatEther(ethBalance)}</p>
                    <p>Current WETH Balance {utils.formatEther(wethBalance)}</p>
                </div>
            )}

            {ethBalance.lte(MAX_ETH) && (
                <p>
                    You don&rsquo;t have enough ETH,{" "}
                    <Link href="/onboarding/eth">
                        <a>please send more ETH</a>
                    </Link>
                </p>
            )}

            <p>
                We&rsquo;ll keep 0.01 as ETH so you can withdraw your funds at
                any time
            </p>
        </div>
    );
};

export default WETHPage;
