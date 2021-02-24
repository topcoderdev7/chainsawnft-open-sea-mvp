import Head from "next/head";
import Signup from "../components/Signup";
import styles from "../styles/Index.module.scss";

export const Home = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className={styles.title}>
                    Welcome to{" "}
                    <a href="https://nextjs.org">Next.js with Magic!</a>
                </h1>
                <p className={styles.description}>
                    Edit the login tool by editing{" "}
                    <code>components/Signup</code>
                </p>
                <Signup />
                <p className={styles.description}>
                    Get started by editing <code>pages/index.tsx</code>
                </p>
            </main>

            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <img
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        className={styles.logo}
                    />
                </a>
            </footer>
        </div>
    );
};

export default Home;
