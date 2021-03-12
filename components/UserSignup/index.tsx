import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import { utils } from "ethers";
import { useUser, useLogin } from "../../context/UserContext";
import useWETHBalance from "../../hooks/useWETHBalance";
import useETHBalance from "../../hooks/useETHBalance";

import styles from "./UserSignup.module.scss";

const UserSignup = (): JSX.Element => {
    const user = useUser();
    const [ethBalance, reloadEthBalance] = useETHBalance();
    const [wethBalance, reloadWethBalance] = useWETHBalance();

    useEffect(() => {
        const interval = setInterval(() => {
            reloadWethBalance();
            reloadEthBalance();
        }, 10000);
        return () => clearInterval(interval);
    }, [reloadWethBalance, reloadEthBalance]);

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
