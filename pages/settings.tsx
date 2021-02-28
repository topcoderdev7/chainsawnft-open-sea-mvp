import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { useUser } from "../context/UserContext";
import { API_URL } from "../utils/constants";
import { getToken } from "../utils/magic";

interface Profile {
    id: number;
    username: string;
    address: string;
}

const useProfile = (user) => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        // eslint-disable-next-line consistent-return
        const fetchProfile = async (): Promise<void> => {
            try {
                if (!user) {
                    return null;
                }
                const token = await getToken();
                const res = await fetch(`${API_URL}/profiles`, {
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
    const profile = useProfile(user);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const token = await getToken();
        if (profile) {
            await fetch(`${API_URL}/profiles/${profile.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: newName,
                    address: user.address,
                }),
            });
        } else {
            await fetch(`${API_URL}/profiles/${profile}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
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
            <Link href="/">
                <a>Please Login First</a>
            </Link>
        );
    }

    return (
        <div>
            <h2>Settings</h2>
            <p>Your username {profile}</p>
            <h2>Change your Username</h2>
            {loading ? "Changing your name" : ""}
            <form onSubmit={handleSubmit}>
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button type="submit">Change Name</button>
            </form>
        </div>
    );
};

export default SettingsPage;
