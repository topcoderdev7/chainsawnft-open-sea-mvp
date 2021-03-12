import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import { useLogout, useUser, User } from "../context/UserContext";
import { API_URL } from "../utils/constants";
import { getToken } from "../utils/magic";
import { hasGivenWETHAllowance } from "../utils/weth";

interface Profile {
    id: number;
    username: string;
    address: string;
}

const useHasGivenAllowance = (user: User) => {
    const [allowance, setAllowance] = useState<boolean>(false);

    useEffect(() => {
        const checkAllowance = async () => {
            if (user) {
                const result = await hasGivenWETHAllowance(
                    user.address,
                    user.provider,
                );
                setAllowance(result);
            }
        };
        checkAllowance();
    }, [user]);

    return allowance;
};

const useProfile = (user) => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        // eslint-disable-next-line consistent-return
        const fetchProfile = async (): Promise<void> => {
            try {
                if (!user) {
                    return null;
                }
                console.log("user address", user.address);
                const token = await getToken();
                const res = await fetch(`${API_URL}/profiles/${user.address}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data.error) {
                    return null;
                }
                setProfile(data);
            } catch (err) {
                console.log("Exception in fetchProfile", err);
            }
        };
        fetchProfile();
    }, [user]);
    return profile;
};

const SettingsPage: React.FC = () => {
    const user = useUser();
    const logout = useLogout();
    const router = useRouter();
    const profile = useProfile(user);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);

    const allowance = useHasGivenAllowance(user);

    const logoutAndExit = async () => {
        await logout();
        router.push("/");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const token = await getToken();
        if (profile) {
            await fetch(`${API_URL}/profiles/${profile.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: newName,
                    address: user.address,
                }),
            });
        } else {
            await fetch(`${API_URL}/profiles/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: newName,
                    address: user.address,
                }),
            });
        }
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
