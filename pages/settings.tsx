import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { useLogout, useUser } from "../context/UserContext";
import { useAllowance } from "../context/BalanceContext";
import { useProfile, useSetProfile } from "../context/ProfileContext";

const SettingsPage: React.FC = () => {
    const user = useUser();
    const logout = useLogout();
    const router = useRouter();
    const profile = useProfile();
    const setProfile = useSetProfile();
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);

    const allowance = useAllowance();

    const logoutAndExit = async () => {
        await logout();
        router.push("/");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await setProfile(newName);
        setLoading(false);
    };

    if (!user) {
        return (
            <Link href="/login">
                <a>Please Login First</a>
            </Link>
        );
    }

    return (
        <div>
            <h2>Settings</h2>
            <p>Your username {profile?.username}</p>
            <h2>Change your Username</h2>
            {loading ? "Changing your name" : ""}
            <form onSubmit={handleSubmit}>
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button type="submit">Change Name</button>
            </form>

            <hr />
            <button onClick={logoutAndExit}>Logout</button>
            <div>
                {allowance
                    ? "You've given allowance"
                    : "You need to give allowance"}
            </div>
        </div>
    );
};

export default SettingsPage;
