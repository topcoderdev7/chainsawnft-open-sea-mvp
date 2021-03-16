import Link from "next/link";

export const UsernamePage = () => {
    return (
        <div>
            <h2>TODO: Username</h2>
            <Link href="/onboarding/eth">
                <a>Add ETH</a>
            </Link>
        </div>
    );
};

export default UsernamePage;
