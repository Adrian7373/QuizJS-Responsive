import { useMemo } from "react";
import style from "./QuestionCard.module.css";
import { useQuizDispatch, useQuizState } from "@/context/QuizContext";

interface QuestionCardProps {
    score: React.ReactNode;
    timer: React.ReactNode;
}

export default function QuestionCard({ score, timer }: QuestionCardProps) {

    const state = useQuizState();
    const result = state.questions.results[state.questionIndex];
    const { questionIndex } = useQuizState();
    const dispatch = useQuizDispatch();

    const shuffledAnswers = useMemo(() => {
        const combined = [...result.incorrect_answers, result.correct_answer];
        combined.sort(() => Math.random() - 0.5)
        console.log(combined);
        return combined;
    }, [result]);

    return (
        <div className={style.card}>
            <div className={style.info}>{score}{timer}</div>
            <p className={style.index}>Question {questionIndex + 1} of 10</p>
            <p className={style.question} dangerouslySetInnerHTML={{ __html: result.question }}></p>
            <div className={style.answers}>
                {shuffledAnswers.map((answer, index) => {
                    return <button dangerouslySetInnerHTML={{ __html: answer }} key={index} onClick={() => dispatch({ type: "user_answered", payload: answer })}></button>
                })}
            </div>
        </div>
    )
}
