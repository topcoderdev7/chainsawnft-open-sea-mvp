import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useSetProfile } from "../../context/ProfileContext";

export const UsernamePage = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const setProfile = useSetProfile();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await setProfile(name);
        setLoading(false);
        router.push("/onboarding/eth");
    };

    return (
        <div>
            <h2>Add your Username</h2>
            <h3>{loading ? "Loading" : ""}</h3>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit" disabled={loading}>
                    Save
                </button>
            </form>
            <Link href="/onboarding/eth">
                <a>I prefer not to</a>
            </Link>
        </div>
    );
};

export default UsernamePage;
