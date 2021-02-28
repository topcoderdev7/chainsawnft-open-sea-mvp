import { Magic } from "magic-sdk";

/**
 * Generates an auth token for magic,
 * throws if called when not logged in
 */
export const getToken = async () => {
    const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY || "");
    const token = await m.user.generateIdToken();
    return token;
};
