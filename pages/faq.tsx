import Head from "next/head";
import styles from "../styles/faq.module.scss";
import { API_URL } from "../utils/constants";
import { Faq } from "../types";
import FaqAccordion from "../components/FaqAccordion";

export const FaqPage: React.FC<{ faq: Faq }> = ({ faq }) => {
    console.log(faq);
    return (
        <div className={styles.faq}>
            <Head>
                <title>Chainsaw NFT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Frequently Asked Questions</h1>
            <FaqAccordion questionsAndAnswers={faq.QandA} />
        </div>
    );
};

export default FaqPage;

export async function getStaticProps() {
    const faqRes = await fetch(`${API_URL}/faq`);
    const faq = await faqRes.json();
    console.log(faq);

    return {
        props: {
            faq,
        },
    };
}
