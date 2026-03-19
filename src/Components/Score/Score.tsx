import style from "./Score.module.css";
import { useContext } from "react";
import { useQuizState } from "@/context/QuizContext";

export default function Score() {

    const { score } = useQuizState();

    return (
        <div className={style.container}>
            <p className={style.score}>Score:{score}</p>
        </div>
    )
}