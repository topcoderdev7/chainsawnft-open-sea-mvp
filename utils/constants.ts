/**
 * Any time you want to add / remove a token, do it here
 */
export const LIST_OF_TOKENS = [
    {
        address: "0xf4680c917a873e2dd6ead72f9f433e74eb9c623c",
        tokenId: "36",
    },
    {
        address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
        tokenId: "7078",
    },
];

export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Max ETH we always keep for withdrawals
export const MAX_ETH = 0.01;
