import { useEffect } from "react";
import style from "./ShowAnswer.module.css";
import { useQuizDispatch, useQuizState } from "@/context/QuizContext";

export default function ShowAnswer() {

    const dispatch = useQuizDispatch();
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({ type: "answer_hidden" });
        }, 2000);
        return () => clearTimeout(timer);
    }, [dispatch])

    const correctAnswer = useQuizState().questions.results[useQuizState().questionIndex].correct_answer;

    return (
        <div className={style.answerDiv}>
            <p>Correct Answer is</p>
            <p dangerouslySetInnerHTML={{ __html: correctAnswer }}></p>
        </div>
    )
}