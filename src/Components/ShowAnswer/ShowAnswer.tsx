import style from "./ShowAnswer.module.css";
import { useQuizState } from "@/context/QuizContext";

export default function ShowAnswer() {

    const correctAnswer = useQuizState().questions.results[useQuizState().questionIndex].correct_answer;

    return (
        <div className={style.answerDiv}>
            <p>Correct Answer is</p>
            <p dangerouslySetInnerHTML={{ __html: correctAnswer }}></p>
        </div>
    )
}