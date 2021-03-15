import { useEffect } from "react";
import { utils } from "ethers";
import { useUser } from "../context/UserContext";
import useETHBalance from "../hooks/useETHBalance";
import { MAX_ETH } from "../utils/constants";
import { wrapETH } from "../utils/weth";
import QRCode from "../components/QrCode";
import CopyUserAddress from "../components/CopyUserAddress";
import useWETHBalance from "../hooks/useWETHBalance";
import { useBalances } from "../context/BalanceContext";

const DepositPage: React.FC = () => {
    const user = useUser();
    const { eth: ethBalance, weth: wethBalance } = useBalances();

    const convertEthToWeth = async () => {
        await wrapETH(ethBalance.sub(MAX_ETH), user.provider.getSigner());
    };

    if (!user) {
        return <div>Please login</div>;
    }

    return (
        <div>
            <h2>Deposit ETH</h2>
            <div>
                ETH Balance (Used for gas and converted into WETH):{" "}
                {utils.formatEther(ethBalance.toString())}
            </div>
            <div>
                WETH Balance (Used for bidding):{" "}
                {utils.formatEther(wethBalance.toString())}
            </div>
            {ethBalance.gt(0) && ethBalance.lt(MAX_ETH) && (
                <p>
                    We keep a small portion of ETH so you can withdraw at any
                    time, if you want to add more funds, please send more ETH or
                    WETH to the address below
                </p>
            )}
            <QRCode address={user.address} />
            <CopyUserAddress address={user.address} />
            {ethBalance.gt(MAX_ETH) && (
                <div>
                    <h2>Convert ETH to WETH!</h2>
                    <button onClick={convertEthToWeth}>
                        Convert ETH to WETH
                    </button>
                </div>
            )}
        </div>
    );
};

export default DepositPage;
