import { motion } from "motion/react"
import styles from './AnswerItem.module.scss'
import classNames from "classnames"
import { getQuestionLetter, normalizeSpaces } from "../../../../utils/questions"

type AnswerItemProps = {
    isAnswered: boolean,
    selectedOption: string | null,
    correctAnswer: string,
    isTimeUp: boolean,
    index: number,
    answer: string,
    onSelect: (answer: string) => void,
}

export const AnswerItem = (props: AnswerItemProps) => {

    const getAnswerClass = (answer: string) => {
        if (!props.isAnswered || !props.selectedOption) return ''
        if (answer === props.correctAnswer) return styles.correct
        if (answer === props.selectedOption) return styles.incorrect
        return styles.dimmed
    }

    const answerClass = classNames(styles.answerButton, getAnswerClass(props.answer))

    return <motion.button
        key={props.answer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + props.index * 0.1 }}
        className={answerClass}
        onClick={() => props.onSelect(props.answer)}
        disabled={props.isAnswered || props.isTimeUp}
        whileHover={!props.isAnswered ? { scale: 1.02 } : {}}
        whileTap={!props.isAnswered ? { scale: 0.98 } : {}}
    >
        <span className={styles.answerLetter}>
            {getQuestionLetter(props.index)}
        </span>
        <span className={styles.answerText}>{normalizeSpaces(props.answer)}</span>
    </motion.button>
}