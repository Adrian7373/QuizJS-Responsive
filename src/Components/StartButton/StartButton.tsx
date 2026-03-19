import style from "./StartButton.module.css";

interface StartButtonProps {
    fetchQuestions: () => void;
}

export default function StartButton({ fetchQuestions }: StartButtonProps) {

    return (
        <button className={style.startButton} onClick={fetchQuestions
        }>
            Start
        </button>
    )
}