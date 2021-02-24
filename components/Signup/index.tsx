import { useState, FormEvent } from "react";
import { useUser, useLogin, useLogout } from "../../context/UserContext";

import styles from "./Signup.module.scss";

const Signup = (): JSX.Element => {
    const user = useUser();
    const logout = useLogout();
    const [email, setEmail] = useState("");

    const login = useLogin();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(email);
    };

    if (user) {
        return (
            <section className={styles.signup}>
                <span>Logged in as {user.email}</span>
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
