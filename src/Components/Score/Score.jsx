import style from "./Score.module.css";
import { useContext } from "react";
import { ScoreTimeContext } from "@/context/ScoreTime";

export default function Score() {

    const { score } = useContext(ScoreTimeContext);

    return (
        <div className={style.container}>
            <p className={style.score}>Score:{score}</p>
        </div>
    )
}