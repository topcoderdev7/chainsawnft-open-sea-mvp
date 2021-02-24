import { NFT } from "../types";

/**
 * Given a seaport (read only is fine)
 * An address (NFT contract)
 * And an id
 * Fetches the asset data
 * @param seaport
 */
export const getAsset = async (
    seaport: any,
    address: string,
    id: string,
): Promise<NFT> => {
    const result = await seaport.api.getAsset({
        tokenAddress: address,
        tokenId: id,
    });
    return result;
};
