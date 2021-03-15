import Link from "next/link";
import { useState, FormEvent } from "react";
import { utils } from "ethers";
import { useUser, useLogin } from "../../context/UserContext";

import styles from "./Signup.module.scss";
import { useBalances } from "../../context/BalanceContext";

const Signup = (): JSX.Element => {
    const user = useUser();
    const [email, setEmail] = useState("");
    const { eth: ethBalance, weth: wethBalance } = useBalances();
    console.log("ethBalance", ethBalance);
    console.log("wethBalance", wethBalance);
    const login = useLogin();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(email);
    };

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
            <span>Log in to your wallet</span>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                />

                <button type="submit">Log in</button>
            </form>
        </section>
    );
};

export default Signup;
