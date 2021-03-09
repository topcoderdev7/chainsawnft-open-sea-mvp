import { BigNumber, Contract, providers } from "ethers";

const WETH_ADDR = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const WETH_ABI = [
    "function deposit() public payable",
    "function withdraw(uint wad) public",
    "function balanceOf(address account) public view virtual override returns (uint256)",
];

/**
 * Wrap the given ETH amount into WETH
 * @param amount
 * @param signer
 * @returns
 */
export const wrapETH = async (
    amount: BigNumber,
    signer: providers.JsonRpcSigner,
): Promise<providers.TransactionReceipt> => {
    const weth = new Contract(WETH_ADDR, WETH_ABI, signer);
    const tx = await weth.deposit({ value: amount });
    const result = await tx.wait();
    return result;
};

/**
 * Get the given address WETH Balance
 * @param address
 * @param provider
 * @returns
 */
export const getWETHBalance = async (
    address: string,
    provider: providers.JsonRpcProvider,
): Promise<BigNumber> => {
    const weth = new Contract(WETH_ADDR, WETH_ABI, provider);
    const balance = await weth.balanceOf(address);
    return balance;
};
