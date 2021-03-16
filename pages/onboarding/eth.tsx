import Link from "next/link";

export const EthPage = () => {
    return (
        <div>
            <h2>TODO: ETH</h2>
            <Link href="/onboarding/weth">
                <a>Wrap WETH</a>
            </Link>
        </div>
    );
};

export default EthPage;
