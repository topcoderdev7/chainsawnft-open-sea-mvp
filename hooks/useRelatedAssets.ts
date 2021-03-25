import { useEffect, useState } from "react";
import { NFT } from "../types";
import { API_URL } from "../utils/constants";

const useRelatedAssets = (nft: NFT): NFT[] => {
    const [related, setRelated] = useState<NFT[]>([]);
    console.log("useRelatedAssets  nft.artist", nft.artist);
    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const artistRes = await fetch(
                    `${API_URL}/artists/${nft?.artist?.id}`,
                );
                console.log("artistRes", artistRes);
                const artist = await artistRes.json();
                console.log("res", artist);
                setRelated(artist.tokens);
            } catch (err) {
                console.log("Exception in fetchRelated", err);
            }
        };
        fetchRelated();
    }, [nft?.artist]);

    return related;
};

export default useRelatedAssets;
