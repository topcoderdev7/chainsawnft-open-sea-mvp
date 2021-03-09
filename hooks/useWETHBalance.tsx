import { useCallback, useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useUser } from "../context/UserContext";
import { getWETHBalance } from "../utils/weth";

const useWETHBalance = (): [BigNumber, () => Promise<void>] => {
    const user = useUser();
    const [balance, setBalance] = useState<BigNumber>(BigNumber.from("0"));

    const fetchUserWETH = useCallback(async () => {
        if (!user) {
            setBalance(BigNumber.from("0"));

            return;
        }
        try {
            const wethBalance = await getWETHBalance(
                user.address,
                user.provider,
            );
            setBalance(wethBalance);
        } catch (err) {
            setBalance(BigNumber.from("0"));
        }
    }, [user]);

    useEffect(() => {
        fetchUserWETH();
    }, [fetchUserWETH, user?.provider]);

    return [balance, fetchUserWETH];
};

export default useWETHBalance;
