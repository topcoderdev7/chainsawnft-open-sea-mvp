import { BigNumber, Contract, providers } from "ethers";

const WETH_ADDR = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const WETH_ABI = [
    "function deposit() public payable",
    "function withdraw(uint wad) public",
];

export const wrapEth = async (
    amount: BigNumber,
    signer: providers.JsonRpcSigner,
): Promise<providers.TransactionReceipt> => {
    const weth = new Contract(WETH_ADDR, WETH_ABI, signer);
    const tx = await weth.deposit({ value: amount });
    const result = await tx.wait();
    return result;
};
