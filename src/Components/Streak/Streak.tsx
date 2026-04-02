import { useQuizState } from "@/context/QuizContext"
import style from "./Streak.module.css"

export default function Streak() {
    const { streak } = useQuizState();

    return (
        <div className={style.container}>
            {streak >= 3 ? <p className={style.streak}>Streak: {streak}(+ Bonus point)</p>
                : <p className={style.streak}>Streak: {streak}</p>}
        </div>
    )
}