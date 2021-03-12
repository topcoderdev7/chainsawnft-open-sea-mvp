import Link from "next/link";
import UserSignup from "../UserSignup";

import styles from "./Header.module.scss";

const Header: React.FC = () => (
    <header>
        <div className={styles.header}>
            <div className={styles.left}>
                <Link href="/">
                    <a>
                        <img src="/images/logo.png" alt="Chainsaw" />
                    </a>
                </Link>
            </div>
            <div className={styles.right}>
                <div>
                    <UserSignup />
                </div>
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
                            <Link href="/artists">
                                <a>ARTISTS</a>
                            </Link>
                        </div>
                        <div>
                            <Link href="/collections">
                                <a>Collections</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <img src="/images/logoclear.png" alt="Chainsaw" />
            </div>
        </div>
    </header>
);

export default Header;
