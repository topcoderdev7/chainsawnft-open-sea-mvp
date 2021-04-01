import React from "react";
import { QandA } from "../../types";

import AccordionItem from "../AccordionItem";

import styles from "./FaqAccordion.module.scss";

const Accordion: React.FC<{ questionsAndAnswers: QandA[] }> = ({
    questionsAndAnswers,
}) => {
    return (
        <ul className={styles.faqAccordion}>
            {questionsAndAnswers.map(({ id, question, answer }) => (
                <AccordionItem
                    key={id}
                    id={id}
                    answer={answer}
                    question={question}
                />
            ))}
        </ul>
    );
};

export default Accordion;
