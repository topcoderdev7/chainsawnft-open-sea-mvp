/**
 * Given a seaport (with signer), place a bid on the given asset for the given startAmount
 * @param seaport
 * @param tokenAddress
 * @param tokenId
 * @param schemaName
 * @param accountAddress
 * @param startAmount
 */
export const bid = async (
    seaport: any,
    tokenAddress: string,
    tokenId: string,
    schemaName: string,
    accountAddress: string,
    startAmount: number,
) => {
    return seaport.createBuyOrder({
        asset: {
            tokenId,
            tokenAddress,
            schemaName, // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
        },
        accountAddress,
        // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        startAmount,
    });
};
