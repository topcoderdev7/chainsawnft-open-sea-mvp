import Link from "next/link";
import Signup from "../components/Signup";
import { useUser } from "../context/UserContext";

const LoginPage: React.FC = () => {
    const user = useUser();
    if (user) {
        return (
            <div>
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
    return <Signup />;
};

export default LoginPage;
