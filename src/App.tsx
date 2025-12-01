import styles from './App.module.scss'
import { AppPage } from './types/trivia'
import { Menu } from './pages/menu/Menu'
import { ClassicMode } from './pages/classicMode/ClassicMode'
import { BattleMode } from './pages/battleMode/BattleMode'
import { LeaderBoard } from './pages/leaderBoard/LeaderBoard'
import { useGame } from './hooks/useGame'
import { EntryScreen } from './pages/entryScreen/EntryScreen'
import { AnimatePresence } from 'motion/react'

const GAME_PLAYER_TURNS = 8

// Note: Given the challenge scope im using custom rendering logic insted of using a router.
function App() {
  const { page, backToMenu, startGameMode, displayLeaderboard, questions, isLoading } = useGame()

  return (
    <main className={styles.app}>
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <EntryScreen />
          ) : (
            <>
              {page === AppPage.menu && <Menu key="menu" onSelectMode={startGameMode} onLeaderboardView={displayLeaderboard} />}
              {page === AppPage.classic && <ClassicMode key="classic" turnsToPlay={GAME_PLAYER_TURNS} onBackToMenu={backToMenu} questions={questions} />}
              {page === AppPage.battle && <BattleMode key="battle" turnsPerPlayer={GAME_PLAYER_TURNS} onBackToMenu={backToMenu} questions={questions} />}
              {page === AppPage.leaderboard && <LeaderBoard key="leaderboard" onBack={backToMenu} />}
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default App
