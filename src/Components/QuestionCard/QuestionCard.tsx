import { useMemo } from "react";
import style from "./QuestionCard.module.css";

interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}
interface QuestionCardProps {
    result: Question;
    checkAnswer: (answer: string) => void;
    questionIndex: number;
    score: React.ReactNode;
    timer: React.ReactNode;
}

export default function QuestionCard({ result, checkAnswer, questionIndex, score, timer }: QuestionCardProps) {

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
                    return <button dangerouslySetInnerHTML={{ __html: answer }} key={index} onClick={() => checkAnswer(answer)}></button>
                })}
            </div>
        </div>
    )
}
