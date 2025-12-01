import { User, Users, Brain, Trophy } from 'lucide-react'
import styles from './Menu.module.scss'
import { AppPage, GameMode } from '../../types/trivia'
import { MenuCard } from './components/menuCard/MenuCard'
import { Button } from '../../components/button/Button'
import useIsMobile from '../../utils/hooks/useIsMobile'

type MenuProps = {
    onSelectMode: (mode: GameMode) => void
    onLeaderboardView: () => void
}

export const Menu = (props: MenuProps) => {

    const handleModeSelection = (mode: GameMode) => () => props.onSelectMode(mode)
    const isMobileView = useIsMobile()

    return <section className={styles.container}>
        <header className={styles.header}>
            <Brain size={100} color='#FFF' className={styles.logo} />
            <h1>Trivia Game</h1>
            <p>Elige tu modo de juego</p>
        </header>
        <div className={styles.modes}>
            <MenuCard
                title="Clasico"
                description="Modo individual para desafiar tus conocimientos"
                icon={<User color={"#6f6fff"} size={48} />}
                onClick={handleModeSelection(AppPage.classic)}
            />
            <MenuCard
                title="Batalla"
                description=" Compite contra un amigo en el mismo dispositivo"
                icon={<Users color={"#f56565"} size={48} />}
                onClick={handleModeSelection(AppPage.battle)}
            />
        </div>
        <div className={styles.leaderboard}>
            <Button
                text={isMobileView ? '' : 'Ver Tabla de Líderes'}
                variant='tertiary'
                icon={<Trophy size={24} />}
                onClick={props.onLeaderboardView}
            />
        </div>

    </section>
}