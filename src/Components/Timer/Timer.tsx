import style from "./Timer.module.css";
import { useQuizState } from "@/context/QuizContext";

export default function Timer() {

    const { countdown } = useQuizState();

    return (
        <div className={style.timer}>
            <p className={style.time}>Time left:{countdown / 1000}</p>
        </div>
    )
}