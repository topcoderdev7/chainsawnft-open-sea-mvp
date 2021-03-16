import styles from "../../styles/landing.module.scss";

export const SuccessPage: React.FC = () => {
    // TODO: Set Cookie to flag user as done
    // TODO2: Perhaps even flag them in strapi as failsafe

    return (
        <div className={styles.container}>
            <h2>You&rsquo;re all Set!</h2>
            <p>You can now bid on your favourite NFT</p>
            <button>Continue</button>
        </div>
    );
};

export default SuccessPage;
