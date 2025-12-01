import { motion } from 'motion/react'
import { Brain } from 'lucide-react'
import styles from './Loader.module.scss'

interface LoaderProps {
    title: string,
    message: string,
}

export const Loader = (props: LoaderProps) => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.loaderContainer}
        >
            <div className={styles.content}>
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        duration: 0.8,
                        type: 'spring',
                        stiffness: 200
                    }}
                    className={styles.iconContainer}
                >
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1
                        }}
                    >
                        <Brain size={80} className={styles.icon} />
                    </motion.div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className={styles.title}
                >
                    {props.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className={styles.subtitle}
                >
                    {props.message}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className={styles.dots}
                >
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    >
                        •
                    </motion.span>
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    >
                        •
                    </motion.span>
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    >
                        •
                    </motion.span>
                </motion.div>
            </div>
        </motion.div>
    )
}
