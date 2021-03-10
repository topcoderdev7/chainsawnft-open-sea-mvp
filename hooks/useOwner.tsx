import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";

const useOwner = (address: string, tokenId: string) => {
    const [assetOwner, setAssetOwner] = useState<string | null>(null);

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const res = await fetch(
                    `https://api.opensea.io/api/v1/asset/${address}/${tokenId}`,
                );
                const data = await res.json();
                const { owner } = data.top_ownerships[0];
                setAssetOwner(owner.address);
                try {
                    const profileRes = await fetch(
                        `${API_URL}/profiles/${owner.address}`,
                    );
                    const profileData = await profileRes.json();
                    setAssetOwner(profileData?.username);
                } catch (err) {
                    console.log("Exception in fetching username", err);
                }
            } catch (err) {
                setAssetOwner(null);
            }
        };
        fetchOwner();
    }, [address, tokenId]);

    return assetOwner;
};

export default useOwner;
