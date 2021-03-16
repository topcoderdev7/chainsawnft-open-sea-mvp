import { utils } from "ethers";
import { useUser } from "../../context/UserContext";
import { MAX_ETH } from "../../utils/constants";
import { wrapETH } from "../../utils/weth";
import QRCode from "../QrCode";
import CopyUserAddress from "../CopyUserAddress";
import { useBalances } from "../../context/BalanceContext";

const DepositETH: React.FC = () => {
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
            <h2>Wrap ETH</h2>
            <div>
                ETH Balance (Used for gas and converted into WETH):{" "}
                {utils.formatEther(ethBalance.toString())}
            </div>
            <div>
                WETH Balance (Used for bidding):{" "}
                {utils.formatEther(wethBalance.toString())}
            </div>
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

export default DepositETH;
