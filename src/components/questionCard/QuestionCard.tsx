import { useState } from "react"
import { Question } from "../../types/trivia"
import { AnimatePresence, motion } from "motion/react"
import styles from './QuestionCard.module.scss'
import { AnswerItem } from "./components/answerItem/AnswerItem"
import { Timer } from "./components/timer/Timer"

type QuestionCardProps = {
    playerName: string,
    question: Question,
    questionNumber: number,
    totalQuestions: number,
    onAnswer: (isCorrect: boolean) => void,
}

const DELAY_FOR_NEXT_TURN_IN_MS = 1000
const TIMEOUT_PER_QUESTION = 8

export const QuestionCard = (props: QuestionCardProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [isTimeUp, setIsTimeUp] = useState(false)

    const handleOptionClick = (answer: string) => {
        if (isAnswered) return

        setSelectedOption(answer)
        setIsAnswered(true)

        const isCorrect = answer === props.question.correct_answer

        setTimeout(() => {
            props.onAnswer(isCorrect)
        }, DELAY_FOR_NEXT_TURN_IN_MS)
    }

    const handleTimeUp = () => {
        if (isAnswered || isTimeUp) return

        setIsTimeUp(true)

        setTimeout(() => {
            props.onAnswer(false)
        }, DELAY_FOR_NEXT_TURN_IN_MS)
    }

    return <AnimatePresence mode="wait">
        <motion.div
            key={props.question.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className={styles.questionCard}
        >

            <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>
                    Pregunta {props.questionNumber} de {props.totalQuestions}
                </span>
            </div>

            {props.playerName && (
                <div className={styles.playerIndicator}>
                    <span>{props.playerName}</span>
                </div>
            )}

            <Timer
                key={props.question.id}
                duration={TIMEOUT_PER_QUESTION}
                onTimeUp={handleTimeUp}
                isActive={!isAnswered}
            />

            <motion.h2
                className={styles.questionText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {props.question.text}
            </motion.h2>

            <div className={styles.answersGrid}>
                {props.question.answers.map((answer, index) => <AnswerItem
                    key={answer}
                    index={index}
                    answer={answer}
                    isAnswered={isAnswered}
                    isTimeUp={isTimeUp}
                    onSelect={handleOptionClick}
                    correctAnswer={props.question.correct_answer}
                    selectedOption={selectedOption}
                />)
                }
            </div>
        </motion.div>
    </AnimatePresence>
}