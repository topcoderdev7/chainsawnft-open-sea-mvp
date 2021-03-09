import Link from "next/link";
import Signup from "../Signup";

import styles from "./Header.module.scss";

const Header: React.FC = () => (
    <header>
        <div className={styles.header}>
            <div className={styles.left}>
                <img src="/images/logo.png" alt="Chainsaw" />
            </div>
            <div className={styles.right}>
                <div>
                    <div className={styles.social}>
                        <a href="https://www.instagram.com/chainsaw_nft">
                            <img src="/logos/instagram.png" alt="discord" />
                        </a>
                        <a href="https://discord.com/invite/aXQqKxKggh">
                            <img src="/logos/discord.png" alt="discord" />
                        </a>
                        <a href="https://twitter.com/ChainSawNFT">
                            <img src="/logos/twitter.png" alt="discord" />
                        </a>
                    </div>
                    <div className={styles.links}>
                        <div>
                            <Link href="/about">
                                <a>ABOUT</a>
                            </Link>
                        </div>
                        <div>
                            <Link href="/artist">
                                <a>ARTISTS</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <img src="/images/logoclear.png" alt="Chainsaw" />
            </div>
        </div>
        {/* <Link href="/">
            <a>Home</a>
        </Link>
        <Signup />
        <Link href="/deposit">Deposit ETH / WETH</Link>
    </div>
);

export default Header;
