import classNames from "classnames"
import styles from './Button.module.scss'

type ButtonProps = {
    variant: "primary" | "secondary" | "play" | "tertiary",
    icon?: React.ReactNode
    text: string,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {

    const buttonClass = classNames(styles.button, {
        [styles.button__primary]: props.variant === "primary",
        [styles.button__secondary]: props.variant === "secondary",
        [styles.button__start]: props.variant === "play",
        [styles.button__tertiary]: props.variant === "tertiary",
        [styles.button__iconOnly]: !props.text,
    })

    return <button className={buttonClass} onClick={props.onClick} type={props.type}>
        {props.icon && props.icon}
        {props.text}
    </button>
}