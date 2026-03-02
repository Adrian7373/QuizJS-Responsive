import style from "./StartButton.module.css";

export default function StartButton({ start }) {
    return (
        <button className={style.startButton} onClick={start}>
            Start
        </button>
    )
}