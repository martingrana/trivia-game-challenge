import { PlayerSetup } from "../playerSetup/PlayerSetup"
import { useBattlePlayer } from "../../hooks/useBattlePlayer"
import { Results } from "../results/Results"
import { QuestionCard } from "../../components/questionCard/QuestionCard"
import { Question } from "../../types/trivia"
import { Users } from "lucide-react"

type BattleModeProps = {
    onBackToMenu: () => void,
    questions: Question[],
    turnsPerPlayer: number
}

export const BattleMode = (props: BattleModeProps) => {

    const {
        isSetupComplete, isFinished, player1Name, player2Name, player1Score,
        player2Score, questions, currentQuestionIndex,
        currentPlayer, restartGame, setupPlayers, handleAnswer,
    } = useBattlePlayer({
        allQuestions: props.questions,
        turnsPerPlayer: props.turnsPerPlayer,
    })

    if (!isSetupComplete) {
        return <PlayerSetup
            onPlayersSetup={setupPlayers}
            icon={<Users size={64} />}
            title="Modo Batalla 1v1"
            subtitle="Ingresa los nombres de los jugadores"
            startLabel="Comenzar Batalla"
            isBattleMode={true}
        />
    }

    if (isFinished) {
        return <Results
            onBackToMenu={props.onBackToMenu}
            onRestart={restartGame}
            player1Name={player1Name}
            player2Name={player2Name}
            player1Score={player1Score}
            player2Score={player2Score}
            totalQuestions={questions.length / 2}
            isBattleMode={true}
        />
    }

    return <QuestionCard
        key={questions[currentQuestionIndex].id}
        question={questions[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        playerName={currentPlayer === 1 ? player1Name : player2Name}
    />
}