import Link from "next/link";
import { useRouter } from "next/router";
import { useAllowance } from "../../context/BalanceContext";
import { useUser } from "../../context/UserContext";

const AllowanceReminder: React.FC = () => {
    const user = useUser();
    const allowance = useAllowance();
    const router = useRouter();

    if (user && !allowance && !router.pathname.includes("onboarding")) {
        return (
            <div>
                <h1>WAIT! You need to onboard!</h1>
                <Link href="/onboarding/username">
                    <a>Onboard</a>
                </Link>
            </div>
        );
    }

    return null;
};

export default AllowanceReminder;
