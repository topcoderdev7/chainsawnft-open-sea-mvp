import { useRouter } from "next/router";

import styles from "./BackButton.module.scss";

const BackButton = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                router.back();
            }}
            className={styles.backBtn}
            type="button"
        >
            <span>&#8592;</span>
        </button>
    );
};

export default BackButton;
