import styles from './MenuCard.module.scss'

type MenuCardProps = {
    icon: React.ReactNode
    title: string,
    description: string,
    onClick: () => void,
}

export const MenuCard = (props: MenuCardProps) => {

    return <button
        className={styles.cardContainer}
        onClick={props.onClick}
        type="button"
    >
        <div className={styles.iconWrapper}>
            {props.icon}
        </div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
    </button>
}