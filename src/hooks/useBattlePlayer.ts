import { useCallback, useState } from "react"
import { Question } from "../types/trivia"
import { getRandomQuestions } from "../utils/questions"
import LeaderboardManager from "../services/leaderboard/LeaderboardManager"

type Props = {
    allQuestions: Question[],
    turnsPerPlayer: number,
}

export const useBattlePlayer = (props: Props) => {
    const totalTurns = props.turnsPerPlayer * 2

    const [questions, setQuestions] = useState(() =>
        getRandomQuestions(props.allQuestions, totalTurns)
    )
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1)
    const [player1Questions, setPlayer1Questions] = useState(0)
    const [player2Questions, setPlayer2Questions] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [player1Name, setPlayer1Name] = useState('')
    const [player2Name, setPlayer2Name] = useState('')
    const [isSetupComplete, setIsSetupComplete] = useState(false)

    const startGame = useCallback(() => {
        const selected = getRandomQuestions(props.allQuestions, totalTurns)
        setQuestions(selected)
        setCurrentQuestionIndex(0)
        setPlayer1Score(0)
        setPlayer2Score(0)
        setCurrentPlayer(1)
        setPlayer1Questions(0)
        setPlayer2Questions(0)
        setIsFinished(false)
    }, [props.allQuestions, totalTurns])

    const setupPlayers = (name1: string, name2: string) => {
        setPlayer1Name(name1)
        setPlayer2Name(name2)
        setIsSetupComplete(true)
        startGame()
    }

    const handleAnswer = (isCorrect: boolean) => {

        // Register turn
        if (currentPlayer === 1) {
            if (isCorrect) {
                setPlayer1Score((prev) => prev + 1)
            }
            setPlayer1Questions((prev) => prev + 1)
        } else {
            if (isCorrect) {
                setPlayer2Score((prev) => prev + 1)
            }
            setPlayer2Questions((prev) => prev + 1)
        }

        const gameEndedForPlayer1 = player1Questions + (currentPlayer === 1 ? 1 : 0) >= props.turnsPerPlayer
        const gameEndedForPlayer2 = player2Questions + (currentPlayer === 2 ? 1 : 0) >= props.turnsPerPlayer

        if (gameEndedForPlayer1 && gameEndedForPlayer2) { // End game and submit scores
            setIsFinished(true)
            LeaderboardManager.battle.submitUserScore(player1Name, player1Score, props.turnsPerPlayer)
            LeaderboardManager.battle.submitUserScore(player2Name, player2Score, props.turnsPerPlayer)
        } else { // Move to next turn
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
            setCurrentQuestionIndex((prev) => prev + 1)
        }
    }

    const restartGame = () => startGame()

    return {
        isSetupComplete,
        isFinished,
        questions,
        currentQuestionIndex,
        currentPlayer,
        currentPlayerName: currentPlayer === 1 ? player1Name : player2Name,
        setupPlayers,
        handleAnswer,
        restartGame,
        player1Score,
        player2Score,
        player1Name,
        player2Name,
    }

}