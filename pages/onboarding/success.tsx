import Link from "next/link";
import styles from "../../styles/landing.module.scss";

export const SuccessPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2>You&rsquo;re all Set!</h2>
            <p>You can now bid on your favourite NFT</p>
            <Link href="/">
                <a>Continue</a>
            </Link>
        </div>
    );
};

export default SuccessPage;
