import { Question } from "../types/trivia"
import { pickRandomly, shuffle } from "./list"

export const getRandomQuestions = (questions: Question[], count: number): Question[] => {
    const shuffleQuestions = shuffle(questions)
    return pickRandomly(shuffleQuestions, count)
}

export const getQuestionLetter = (questionIndex: number) => { // A, B, C, ...
    return String.fromCharCode(65 + questionIndex)
}

export const calculateScorePercentage = (score: number, total: number) => {
    // Floor prevents decimals like (66.6666...%) to be displayed
    return Math.floor((score / total) * 100)
}

export const normalizeSpaces = (str: string) => {
    // Replaces special characters in the answers for normal spacing character
    return str
        .replace(/[\u00A0\u202F\u2007\u2060\uFEFF]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
}