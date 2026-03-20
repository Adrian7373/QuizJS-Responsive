import style from "./StartButton.module.css";
import { playSound } from "@/context/QuizContext";

interface StartButtonProps {
    fetchQuestions: () => void;
}

export default function StartButton({ fetchQuestions }: StartButtonProps) {

    return (
        <button className={style.startButton} onClick={() => {
            fetchQuestions();
            playSound("start.mp3");
        }
        }>
            Start
        </button>
    )
}