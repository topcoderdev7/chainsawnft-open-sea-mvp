import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import { utils } from "ethers";
import { useUser, useLogin, useLogout } from "../../context/UserContext";
import useWETHBalance from "../../hooks/useWETHBalance";
import useETHBalance from "../../hooks/useETHBalance";

import styles from "./Signup.module.scss";

const Signup = (): JSX.Element => {
    const user = useUser();
    const logout = useLogout();
    const [email, setEmail] = useState("");
    const [ethBalance, reloadEthBalance] = useETHBalance();
    const [wethBalance, reloadWethBalance] = useWETHBalance();

    const login = useLogin();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(email);
    };

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
                <span>Your Address {user.address}</span>
                <span>Your ETH Balance: {utils.formatEther(ethBalance)}</span>
                <span>
                    Your WETH Balance: {utils.formatEther(wethBalance)}{" "}
                </span>
                <Link href="/settings">
                    <button>Change your name</button>
                </Link>
                <span>TODO Balance of ETH, Balance of WETH</span>
                <button onClick={logout}>Logout</button>
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
