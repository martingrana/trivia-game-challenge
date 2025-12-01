import { Question } from '../../types/trivia'


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchGameData = async () => {
    const apiURL = `${API_BASE_URL}/get-questions`
    const res = await fetch(apiURL, {
        method: "GET",
    })
    if (!res.ok) {
        throw new Error("Failed to fetch questions")
    }
    return res.json() as Promise<Question[]>
}