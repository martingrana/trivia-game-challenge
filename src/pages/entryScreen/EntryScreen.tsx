import { Variants, motion } from "motion/react"
import { Loader } from "../../components/loader/Loader"

export const EntryScreen = () => {

    const containerVariants: Variants = {
        visible: {
            opacity: 1,
            transition: { duration: 0 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3, ease: "easeIn" }
        }
    }

    return <motion.section
        variants={containerVariants}
        initial="visible"
        exit="exit"
    >
        <Loader title='Trivia' message='Pon a prueba tus conocimientos' />
    </motion.section>
}