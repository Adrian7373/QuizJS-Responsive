import style from "./DifficultySelector.module.css";
import { Difficulty } from "@/app/quiz.types";
import { useQuizDispatch, useQuizState } from "@/context/QuizContext";

export default function DifficultySelector() {

    const { difficulty } = useQuizState();
    const dispatch = useQuizDispatch();

    return (
        <div className={style.difficultyDiv}>
            <select className={style.select} value={difficulty} onChange={(e) => dispatch({ type: "difficulty_changed", payload: e.target.value as Difficulty })}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    )
}