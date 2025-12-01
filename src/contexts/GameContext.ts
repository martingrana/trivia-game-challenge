import { createContext } from "react"
import { AppPage, GameMode, Question } from '../types/trivia'

type GameContextType = {
    page: AppPage,
    questions: Question[],
    isLoading: boolean,
    startGameMode: (mode: GameMode) => void,
    backToMenu: () => void,
    displayLeaderboard: () => void,
}

export const GameContext = createContext<GameContextType>({
    page: AppPage.menu,
    backToMenu: () => { },
    startGameMode: () => { },
    displayLeaderboard: () => { },
    questions: [],
    isLoading: true
})