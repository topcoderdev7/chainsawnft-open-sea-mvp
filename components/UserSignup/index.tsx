import Link from "next/link";
import { utils } from "ethers";
import { useUser } from "../../context/UserContext";

import styles from "./UserSignup.module.scss";
import { useBalances } from "../../context/BalanceContext";

const UserSignup = (): JSX.Element => {
    const user = useUser();
    const { eth: ethBalance, weth: wethBalance } = useBalances();

    if (user) {
        return (
            <section className={styles.signup}>
                <span>Logged in as {user.email}</span>
                <span className={styles.hidden}>
                    Your Address {user.address}
                </span>
                <span className={styles.hidden}>
                    Your ETH Balance: {utils.formatEther(ethBalance)}
                </span>
                <span>WETH Balance: {utils.formatEther(wethBalance)} </span>
                <ul>
                    <li>
                        <Link href="/settings">
                            <a>Settings</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/deposit">Deposit ETH</Link>
                    </li>
                </ul>
            </section>
        );
    }

    return (
        <section className={styles.signup}>
            <Link href="/login">
                <a>Signup</a>
            </Link>
        </section>
    );
};

export default UserSignup;
