export type Question = {
    id: number,
    created_at: string,
    text: string,
    answers: string[],
    correct_answer: string,
}

export enum AppPage {
    menu,
    classic,
    battle,
    leaderboard,
}

export type GameMode = AppPage.classic | AppPage.battle

export interface GameState {
    page: AppPage
    currentQuestionIndex: number
    score: number
    selectedAnswer: string | null
    isAnswered: boolean
    questions: Question[]
}

export interface BattleState extends GameState {
    player1Score: number
    player2Score: number
    currentPlayer: 1 | 2
    player1Questions: number
    player2Questions: number
}
