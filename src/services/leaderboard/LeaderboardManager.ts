const CLASSIC_LEADER_BOARD_KEY = "classic_leader_board"
const BATTLE_LEADER_BOARD_KEY = "battle_leader_board"

export type RankingEntry = {
    player: string,
    score: number,
    date: Date,
    questionsAmount: number,
}

const addEntry = (key: string, entry: RankingEntry) => {
    const entries = localStorage.getItem(key)
    const ranking = JSON.parse(entries || "[]") as RankingEntry[]
    ranking.push(entry)
    localStorage.setItem(key, JSON.stringify(ranking))
}

const listEntries = (key: string) => {
    const entries = localStorage.getItem(key)
    const ranking = JSON.parse(entries || "[]") as RankingEntry[]
    const rankingWithDates = ranking.map((rank) => ({ ...rank, date: new Date(rank.date) }))

    return rankingWithDates.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}

// Abstraction to manage localstorage entries for leaderboard
const LeaderboardManager = {
    classic: {
        submitUserScore: (playerName: string, score: number, questionsAmount: number) => {
            addEntry(CLASSIC_LEADER_BOARD_KEY, {
                player: playerName,
                score,
                date: new Date(),
                questionsAmount,
            })
        },
        getRanking: () => listEntries(CLASSIC_LEADER_BOARD_KEY)
    },
    battle: {
        submitUserScore: (playerName: string, score: number, questionsAmount: number) => {
            addEntry(BATTLE_LEADER_BOARD_KEY, {
                player: playerName,
                score,
                date: new Date(),
                questionsAmount
            })
        },
        getRanking: () => listEntries(BATTLE_LEADER_BOARD_KEY)
    },
}

export default LeaderboardManager