import { utils } from "ethers";

export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Max ETH we always keep for withdrawals
export const MAX_ETH = utils.parseEther("0.014");

export const TOKENS_PER_PAGE = 40;
export const ARTISTS_PER_PAGE = 40;
