import { useState, FormEvent } from "react";
import { useLogin } from "../../context/UserContext";

import styles from "./Signup.module.scss";

const Signup = (): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const login = useLogin();

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        await login();
    };

    return (
        <section className={styles.signup}>
            <h2>Log in with Metamask</h2>
            <form onSubmit={handleSubmit}>
                <button type="submit">{loading ? "Loading" : "Log in"}</button>
            </form>
        </section>
    );
};

export default Signup;
