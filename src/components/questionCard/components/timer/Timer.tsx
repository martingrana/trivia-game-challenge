import React, { useEffect, useState } from 'react'
import styles from './Timer.module.scss'
import classNames from 'classnames'

type TimerProps = {
    duration: number
    onTimeUp: () => void
    isActive: boolean
}

export const Timer = ({ duration, onTimeUp, isActive }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(() => duration)

    useEffect(() => {
        if (timeLeft === 0 && isActive) {
            onTimeUp()
        }
    }, [timeLeft, isActive, onTimeUp])

    useEffect(() => {
        if (!isActive) return

        const interval = setInterval(() => {
            setTimeLeft((t) => t - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [isActive, duration])

    const percentage = (timeLeft / duration) * 100
    const isWarning = percentage < 30

    return <div className={styles.container}>
        <div className={styles.progressBarContainer}>
            <div
                className={classNames(styles.progressBarFill, {
                    [styles.warningBar]: isWarning
                })}
                style={{ width: `${percentage}%` }}
            />
        </div>
        <div className={styles.text}>
            <span className={classNames(styles.textValue, {
                [styles.timeout]: timeLeft === 0
            })}>
                {timeLeft > 0 ? `${timeLeft} s` : 'Se acabó el tiempo!'}
            </span>
        </div>
    </div>
}