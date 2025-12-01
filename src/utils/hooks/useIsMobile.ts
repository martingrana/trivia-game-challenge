import { useState, useEffect } from "react"

// Added this custom hook to display a shorter version of the leaderboard button in mobile.
export const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < breakpoint)
        }

        checkIsMobile()

        window.addEventListener('resize', checkIsMobile)

        return () => window.removeEventListener('resize', checkIsMobile)
    }, [breakpoint])

    return isMobile
}

export default useIsMobile
