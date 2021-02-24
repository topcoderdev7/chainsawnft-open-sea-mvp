import { OpenSeaPort, Network } from "opensea-js";

export const makeSeaport = (signerOrProvider: any) => {
    return new OpenSeaPort(signerOrProvider, {
        networkName: Network.Main,
    });
};
