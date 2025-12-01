import React, { useEffect, useState } from "react"
import { AppPage, GameMode, Question } from '../types/trivia'
import { fetchGameData } from "../services/api/fetchGameData"
import { GameContext } from "./GameContext"

// Delay for the entry screen animation
const DELAY_TO_START_IN_MS = 1500

// Main provider for the game context: handles page navigation status and game data
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [page, setPage] = useState<AppPage>(AppPage.menu)
    const [questions, setQuestions] = useState<Question[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)

    const loadQuestions = async () => {
        try {
            setLoading(true)
            const response = await fetchGameData()
            setQuestions(response)
        } catch (err) { // In a production app I would set an error state for the user and handle retry logic
            console.error('Failed to retrieve trivia questions', err)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, DELAY_TO_START_IN_MS)
        }
    }

    useEffect(() => {
        loadQuestions()
    }, [])

    const handleSelectMode = (mode: GameMode) => setPage(mode)

    const handleBackToMenu = () => setPage(AppPage.menu)

    const handleDisplayLeaderboard = () => setPage(AppPage.leaderboard)

    return (
        <GameContext.Provider value={{
            page,
            backToMenu: handleBackToMenu,
            startGameMode: handleSelectMode,
            displayLeaderboard: handleDisplayLeaderboard,
            questions,
            isLoading,
        }}>
            {children}
        </GameContext.Provider>
    )
}