export const shuffle = <T>(list: T[]): T[] => {
    return [...list].sort(() => Math.random() - 0.5)
}

export const pickRandomly = <T>(shuffledList: T[], count: number): T[] => {
    return shuffledList.slice(0, count)
} 
