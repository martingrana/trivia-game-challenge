import { User } from "lucide-react"
import { QuestionCard } from "../../components/questionCard/QuestionCard"
import { useClassicPlayer } from "../../hooks/useClassicPlayer"
import { Question } from "../../types/trivia"
import { Results } from "../results/Results"
import { PlayerSetup } from "../playerSetup/PlayerSetup"

type ClassicModeProps = {
    onBackToMenu: () => void,
    questions: Question[],
    turnsToPlay: number
}

export const ClassicMode = (props: ClassicModeProps) => {

    const {
        isFinished, questions, isSetupComplete, setupPlayer, activeQuestionIndex, score, onRestart, handleAnswer, playerName
    } = useClassicPlayer({
        allQuestions: props.questions,
        turnsToPlay: props.turnsToPlay
    })

    if (!isSetupComplete) {
        return <PlayerSetup
            onPlayerSetup={setupPlayer}
            icon={<User size={64} />}
            title="Modo Clásico"
            subtitle="Ingresa tu nombre para comenzar"
            startLabel="Comenzar Partida"
            isBattleMode={false}
        />
    }

    if (isFinished) {
        return <Results
            onBackToMenu={props.onBackToMenu}
            onRestart={onRestart}
            player1Name={playerName}
            player1Score={score}
            totalQuestions={questions.length}
            isBattleMode={false}
        />
    }

    return <QuestionCard
        key={questions[activeQuestionIndex].id}
        playerName={playerName}
        question={questions[activeQuestionIndex]}
        questionNumber={activeQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
    />
}