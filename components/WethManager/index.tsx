import { BigNumber } from "ethers";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { wrapETH } from "../../utils/weth";

const WethManager: React.FC = () => {
    const user = useUser();

    const [loading, setLoading] = useState(false);

    const swapEthForWeth = async () => {
        setLoading(true);
        try {
            const signer = user.provider.getSigner();
            await wrapETH(BigNumber.from("1000000000000000"), signer);
        } catch (err) {
            alert(`Exception  ${err}`);
        }
        setLoading(false);
    };

    if (!user) {
        return null;
    }

    return (
        <div>
            {loading ? "Loading" : ""}
            <button onClick={swapEthForWeth}>Swap Some ETH for WETH</button>
        </div>
    );
};

export default WethManager;
