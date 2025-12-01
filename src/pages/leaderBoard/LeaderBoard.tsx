
import { useMemo, useState } from 'react'
import { Button } from '../../components/button/Button'
import styles from './LeaderBoard.module.scss'
import { Trophy, ArrowLeft } from 'lucide-react'
import LeaderboardManager from '../../services/leaderboard/LeaderboardManager'
import classNames from 'classnames'
import { UserRank } from './components/userRank/UserRank'

type LeaderBoardProps = {
    onBack: () => void,
}

type FilterType = 'classic' | 'battle'

export const LeaderBoard = (props: LeaderBoardProps) => {

    const [filter, setFilter] = useState<FilterType>('classic')

    const ranking = useMemo(() => {
        return filter === 'classic' ?
            LeaderboardManager.classic.getRanking() :
            LeaderboardManager.battle.getRanking()
    }, [filter])

    const renderRanking = () => {
        if (ranking.length === 0) {
            return (
                <div className={styles.empty}>
                    <p>No hay records todavía</p>
                    <p>Juega una partida para aparecer aquí!</p>
                </div>
            )
        }

        return (
            <div className={styles.scoresList}>
                {ranking.map((rank, index) => (
                    <UserRank
                        key={`${rank.player}_${rank.date.toISOString()}`}
                        rank={rank}
                        index={index}
                    />
                ))}
            </div>
        )
    }

    return <section className={styles.container}>
        <div className={styles.header}>
            <div className={styles.trophyIcon}>
                <Trophy size={48} />
            </div>
            <h3>Tabla de Líderes</h3>
        </div>
        <div className={styles.chipsContainer}>
            <button
                className={classNames(styles.chipButton, {
                    [styles.active]: filter === 'classic',
                })}
                onClick={() => setFilter('classic')}
                aria-pressed={filter === 'classic'}
            >
                Clásico
            </button>
            <button
                className={classNames(styles.chipButton, {
                    [styles.active]: filter === 'battle',
                })}
                onClick={() => setFilter('battle')}
                aria-pressed={filter === 'battle'}
            >
                Batalla
            </button>
        </div>
        <div className={styles.entries}>
            {renderRanking()}
        </div>
        <div className={styles.actions}>
            <Button
                variant='primary'
                text='Volver al Menú'
                icon={<ArrowLeft size={20} />}
                onClick={props.onBack}
            />
        </div>
    </section>
}