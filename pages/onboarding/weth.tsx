import { utils } from "ethers";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";
import { MAX_ETH } from "../../utils/constants";
import { wrapETH } from "../../utils/weth";
import { useAllowance, useBalances } from "../../context/BalanceContext";

const WETHPage: React.FC = () => {
    const user = useUser();
    const { eth: ethBalance, weth: wethBalance } = useBalances();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const allowance = useAllowance();

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
        <div>
            {allowance && (
                <p>
                    It seems like you already gave allowance, are you sure you
                    need to do this again?
                </p>
            )}
            <h2>Approve ETH to WETH</h2>
            <div>
                We&rsquo;ll wrap your ETH into WETH and you can start trading
            </div>
            {ethBalance.gt(MAX_ETH) && (
                <button onClick={convertEthToWeth}>Approve</button>
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
