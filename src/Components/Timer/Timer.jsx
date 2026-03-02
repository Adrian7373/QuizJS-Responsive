import style from "./Timer.module.css";
import { useContext } from "react";
import { ScoreTimeContext } from "@/context/ScoreTime";

export default function Timer() {

    const { countdown } = useContext(ScoreTimeContext);

    return (
        <div className={style.timer}>
            <p className={style.time}>Time left:{countdown / 1000}</p>
        </div>
    )
}