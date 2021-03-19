import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { useLogin } from "../../context/UserContext";
import { getInfuraProvider } from "../../utils/infura";
import { hasGivenWETHAllowance } from "../../utils/weth";

import styles from "./Signup.module.scss";

const Signup = (): JSX.Element => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const login = useLogin();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        const user = await login(email);
        if (user) {
            console.log("User is loggedin");
        }

        // Check if they have allowance, if they don't send them to onboarding
        const allowance = await hasGivenWETHAllowance(
            user.address,
            getInfuraProvider(),
        );
        if (!allowance) {
            router.push("/onboarding/username");
        } else {
            router.push("/");
        }
        setLoading(false);
    };

    return (
        <section className={styles.signup}>
            <h2>Log in to start collecting!</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                />

                <button type="submit">{loading ? "Loading" : "Log in"}</button>
            </form>
        </section>
    );
};

export default Signup;
