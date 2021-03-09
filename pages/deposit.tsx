import { useEffect } from "react";
import { utils } from "ethers";
import { useUser } from "../context/UserContext";
import useETHBalance from "../hooks/useETHBalance";
import { MAX_ETH } from "../utils/constants";
import { wrapETH } from "../utils/weth";
import QRCode from "../components/QrCode";
import CopyUserAddress from "../components/CopyUserAddress";

const DepositPage: React.FC = () => {
    const user = useUser();
    const [ethBalance, reloadEthBalance] = useETHBalance();
    useEffect(() => {
        const interval = setInterval(() => {
            reloadEthBalance();
        }, 1000);
        return () => clearInterval(interval);
    }, [reloadEthBalance]);

    const convertEthToWeth = async () => {
        await wrapETH(ethBalance.sub(MAX_ETH), user.provider.getSigner());
    };

    if (!user) {
        return <div>Please login</div>;
    }

    return (
        <div>
            <h2>Deposit ETH</h2>
            <div>ETH Balance: {utils.formatEther(ethBalance.toString())}</div>
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
