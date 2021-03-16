import Link from "next/link";
import Signup from "../components/Signup";
import { useUser } from "../context/UserContext";
import styles from "../styles/landing.module.scss";

const LoginPage: React.FC = () => {
    const user = useUser();
    if (user) {
        return (
            <div className={styles.container}>
                <h2>Your are logged in</h2>
                <Link href="/">
                    <a>View Art</a>
                </Link>
                <Link href="/settings">
                    <a>Change Settings</a>
                </Link>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <Signup />
        </div>
    );
};

export default LoginPage;
