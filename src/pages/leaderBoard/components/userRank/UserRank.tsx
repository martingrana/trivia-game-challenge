import { Medal } from 'lucide-react'
import classNames from 'classnames'
import { DateFormatter } from '../../../../utils/date'
import { calculateScorePercentage } from '../../../../utils/questions'
import styles from './UserRank.module.scss'
import { RankingEntry } from '../../../../services/leaderboard/LeaderboardManager'

const MEDAL_CONFIG = [
    { index: 0, className: styles.goldMedal },
    { index: 1, className: styles.silverMedal },
    { index: 2, className: styles.bronzeMedal },
]

type UserRankProps = {
    rank: RankingEntry,
    index: number,
}

export const UserRank = (props: UserRankProps) => {
    const isTop3 = props.index < 3
    const medalConfig = MEDAL_CONFIG[props.index]

    return (
        <div className={classNames(styles.entry, { [styles.top3]: isTop3 })}>
            <div className={styles.rank}>
                {medalConfig ? (
                    <Medal className={medalConfig.className} size={24} />
                ) : (
                    <span>#{props.index + 1}</span>
                )}
            </div>
            <div className={styles.player}>
                <p>{props.rank.player}</p>
                <p>{DateFormatter.format(props.rank.date)}</p>
            </div>
            <div>
                <p>{calculateScorePercentage(props.rank.score, props.rank.questionsAmount)}%</p>
            </div>
        </div>
    )
}
