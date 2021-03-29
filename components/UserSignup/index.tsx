import Link from "next/link";
import { utils } from "ethers";
import { useUser } from "../../context/UserContext";

import styles from "./UserSignup.module.scss";
import { useBalances } from "../../context/BalanceContext";
import { useProfile } from "../../context/ProfileContext";

const UserSignup = (): JSX.Element => {
    const user = useUser();
    const profile = useProfile();
    const { eth: ethBalance, weth: wethBalance } = useBalances();
    console.log("wethBalance", wethBalance);

    if (user) {
        return (
            <section className={styles.signup}>
                <div>{profile?.username || user?.address}</div>
                {/* For Debugging */}
                <div className={styles.hidden}>Your Address {user.address}</div>
                <div className={styles.hidden}>
                    ETH Balance: {utils.formatEther(ethBalance)}
                </div>
                <div>WETH: {utils.formatEther(wethBalance)} </div>
                <ul>
                    <li>
                        <Link href="/settings">
                            <a>Settings</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/my">My Collection</Link>
                    </li>
                </ul>
            </section>
        );
    }

    return (
        <section className={styles.signup}>
            <div>
                <Link href="/login">
                    <a>Connect Wallet</a>
                </Link>
            </div>
        </section>
    );
};

export default UserSignup;
