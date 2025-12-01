
import styles from './TextInput.module.scss'

type TextInputProps = {
    id: string,
    value: string,
    label: string,
    placeHolder: string,
    maxLength?: number
    onChange: (value: string) => void,
}

export const TextInput = (props: TextInputProps) => {

    return <div className={styles.inputGroup}>
        <label htmlFor={props.id} className={styles.label}>
            {props.label}
        </label>
        <input
            id={props.id}
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeHolder}
            maxLength={props.maxLength || 20}
            className={styles.input}
        />
    </div>
}