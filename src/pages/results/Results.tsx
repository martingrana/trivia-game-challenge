
import { Trophy, RotateCcw, Home } from 'lucide-react'
import styles from './Results.module.scss'
import { Button } from '../../components/button/Button'
import classNames from 'classnames'
import { calculateScorePercentage } from '../../utils/questions'

type BaseProps = {
    totalQuestions: number
    onRestart: () => void
    onBackToMenu: () => void
    player1Score: number
    player1Name: string
}

type GameModeProps = ({
    isBattleMode: true
    player2Score: number
    player2Name: string
} | {
    isBattleMode: false
})

export type ResultsProps = BaseProps & GameModeProps

type WinnerStatus = 'player1' | 'player2' | 'tie'

const getWinnerStatus = (isBattleMode: boolean, score1: number, score2: number) => {
    let result: WinnerStatus = 'player1'
    if (isBattleMode) {
        if (score2 > score1) {
            result = 'player2'
        } else if (score2 === score1) {
            result = 'tie'
        }
    }
    return result
}

export const Results = (props: ResultsProps) => {

    const player1ScorePercentage = calculateScorePercentage(props.player1Score, props.totalQuestions)

    const winnerStatus: WinnerStatus = props.isBattleMode ? getWinnerStatus(props.isBattleMode, props.player1Score, props.player2Score) : 'tie'

    const getClassicMessage = () => {
        if (player1ScorePercentage >= 80) return '¡Excelente trabajo!'
        if (player1ScorePercentage >= 60) return '¡Buen trabajo!'
        if (player1ScorePercentage >= 40) return 'No está mal!'
        return '¡Sigue intentándolo!'
    }

    const getBattleMessage = () => {
        if (props.isBattleMode) {
            switch (winnerStatus) {
                case 'player1':
                    return `${props.player1Name} es el ganador!`
                case 'player2':
                    return `${props.player2Name} es el ganador!`
                default:
                    return "Empate!"
            }
        }
    }

    const renderPlayerScore = (name: string, score: number, player: 1 | 2) => {
        const isWinner = (player === 1 && winnerStatus === 'player1') || (player === 2 && winnerStatus === 'player2')
        const scoreClass = classNames(styles.playerScore, {
            [styles.playerScore__winner]: isWinner
        })
        return <div className={scoreClass}>
            <h3>{name}</h3>
            <p>{score} / {props.totalQuestions}</p>
        </div>
    }

    const renderScores = () => {
        if (props.isBattleMode) {
            return <div className={styles.battleScores}>
                {renderPlayerScore(props.player1Name, props.player1Score, 1)}
                <p className={styles.versus}>VS</p>
                {renderPlayerScore(props.player2Name, props.player2Score, 2)}
            </div>
        } else {
            return <div className={styles.scores}>
                {renderPlayerScore(props.player1Name, props.player1Score, 1)}
            </div>
        }
    }

    return <section className={styles.resultsContainer}>
        <div className={styles.header}>
            <div className={styles.throphyIcon}>
                <Trophy size={60} />
            </div>
            <div className={styles.results}>
                <h3>{props.isBattleMode ? getBattleMessage() : getClassicMessage()}</h3>
                <section className={styles.scoresWrapper}>
                    {renderScores()}
                </section>
            </div>
        </div>
        <div
            className={styles.buttonContainer}
        >
            <Button
                variant='primary'
                text='Jugar de nuevo'
                onClick={props.onRestart}
                icon={<RotateCcw size={20} />}
            />
            <Button
                variant='secondary'
                text='Menú principal'
                onClick={props.onBackToMenu}
                icon={<Home size={20} />}
            />
        </div>

    </section>
}
