import { utils } from "ethers";
import { useUser } from "../context/UserContext";
import { MAX_ETH } from "../utils/constants";
import { wrapETH } from "../utils/weth";
import QRCode from "../components/QrCode";
import CopyUserAddress from "../components/CopyUserAddress";
import { useAllowance, useBalances } from "../context/BalanceContext";
import styles from "../styles/landing.module.scss";
import ConvertToWETH from "../components/ConvertToWETH";

const DepositETH: React.FC = () => {
    const user = useUser();
    const { eth: ethBalance, weth: wethBalance } = useBalances();
    const allowance = useAllowance();
    const convertEthToWeth = async () => {
        await wrapETH(ethBalance.sub(MAX_ETH), user.provider.getSigner());
    };

    if (!user) {
        return <div>Please login</div>;
    }

    return (
        <div className={styles.container}>
            <h2>Deposit ETH / WETH</h2>
            {allowance && (
                <p>
                    NOTE: Since you already gave allowance, you can simply send
                    WETH to save some gas
                </p>
            )}
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
            <ConvertToWETH />
        </div>
    );
};

export default DepositETH;
