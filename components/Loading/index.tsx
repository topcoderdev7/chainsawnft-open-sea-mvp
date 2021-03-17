import styles from "./Loading.module.scss";

const Loading: React.FC<{ message: string }> = ({ message }) => (
    <>
        <img
            src="/images/loading.svg"
            className={styles.rotate}
            alt="Loading"
        />
        {message}
    </>
);

export default Loading;
