import { useCallback, useState } from "react"
import { Question } from "../types/trivia"
import { getRandomQuestions } from "../utils/questions"
import LeaderboardManager from "../services/leaderboard/LeaderboardManager"

type Props = {
    allQuestions: Question[]
    turnsToPlay: number
}

export const useClassicPlayer = (props: Props) => {

    const [questions, setQuestions] = useState(() =>
        getRandomQuestions(props.allQuestions, props.turnsToPlay)
    )
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    const [playerName, setPlayerName] = useState('')

    const handleAnswer = (isCorrect: boolean) => {
        // Apply turn score
        if (isCorrect) {
            setScore((prev) => prev + 1)
        }
        const gameEnded = currentQuestionIndex + 1 >= questions.length
        if (gameEnded) { // End game and submit scores
            setIsFinished(true)
            LeaderboardManager.classic.submitUserScore(playerName, score, props.turnsToPlay)
        } else { // Move to next turn
            setCurrentQuestionIndex((prev) => prev + 1)
        }
    }

    const startGame = useCallback(() => {
        const selected = getRandomQuestions(props.allQuestions, props.turnsToPlay)
        setQuestions(selected)
        setCurrentQuestionIndex(0)
        setScore(0)
        setIsFinished(false)
    }, [props.allQuestions, props.turnsToPlay])

    const onRestart = () => startGame()

    const setupPlayer = (name: string) => {
        setPlayerName(name)
        setIsSetupComplete(true)
        startGame()
    }

    return {
        score,
        isFinished,
        questions,
        handleAnswer,
        onRestart,
        activeQuestionIndex: currentQuestionIndex,
        isSetupComplete,
        setupPlayer,
        playerName
    }
}