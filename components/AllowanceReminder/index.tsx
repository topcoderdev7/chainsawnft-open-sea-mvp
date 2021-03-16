import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAllowance } from "../../context/BalanceContext";
import { useUser } from "../../context/UserContext";

const AllowanceReminder: React.FC = () => {
    const user = useUser();
    const allowance = useAllowance();
    const router = useRouter();

    const [show, setShow] = useState(true);

    if (user && !allowance && !router.pathname.includes("onboarding") && show) {
        return (
            <div>
                <h1>Seems like you need to onboard</h1>
                <Link href="/onboarding/username">
                    <a>Onboard</a>
                </Link>
                <button onClick={() => setShow(false)}>
                    Stop showing me this
                </button>
            </div>
        );
    }

    return null;
};

export default AllowanceReminder;
