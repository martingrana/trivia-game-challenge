import React, { useState } from 'react'
import { Play } from 'lucide-react'
import styles from './PlayerSetup.module.scss'
import { TextInput } from '../../components/textInput/TextInput'
import { Button } from '../../components/button/Button'
import classNames from 'classnames'

type PlayerSetupProps = {
    title: string,
    subtitle: string,
    startLabel: string,
    icon: React.ReactNode,
} & ({
    isBattleMode: true,
    onPlayersSetup: (player1Name: string, player2Name: string) => void,
} | {
    isBattleMode: false,
    onPlayerSetup: (player1Name: string) => void,
})

export const PlayerSetup = (props: PlayerSetupProps) => {
    const [player1Name, setPlayer1Name] = useState('')
    const [player2Name, setPlayer2Name] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const name1 = player1Name.trim() || 'Jugador 1'

        if (props.isBattleMode) {
            const name2 = player2Name.trim() || 'Jugador 2'
            props.onPlayersSetup(name1, name2)
        } else {
            props.onPlayerSetup(name1)
        }
    }

    return (
        <div className={styles.setupContainer}>
            <div className={classNames(styles.iconContainer, {
                [styles.classic]: !props.isBattleMode
            })}>
                {props.icon}
            </div>

            <h2 className={styles.title}>
                {props.title}
            </h2>

            <p className={styles.subtitle}>
                {props.subtitle}
            </p>

            <form
                onSubmit={handleSubmit}
                className={styles.form}
            >
                <TextInput
                    id={"player1"}
                    label={props.isBattleMode ? 'Jugador 1' : 'Nombre'}
                    value={player1Name}
                    placeHolder='Jugador 1'
                    onChange={setPlayer1Name}
                />
                {props.isBattleMode && <TextInput
                    id={"player2"}
                    label='Jugador 2'
                    value={player2Name}
                    placeHolder='Jugador 2'
                    onChange={setPlayer2Name}
                />}
                <Button
                    type="submit"
                    text={props.startLabel}
                    variant='play'
                    icon={<Play size={20} />}
                />
            </form>
        </div>
    )
}
