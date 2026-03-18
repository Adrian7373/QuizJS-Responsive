import style from "./Timer.module.css";
import { useContext } from "react";
import { ScoreTimeContext } from "@/context/ScoreTime";

export default function Timer() {

    const context = useContext(ScoreTimeContext);
    if (!context) {
        return null;
    }
    const { countdown } = useContext(ScoreTimeContext);

    return (
        <div className={style.timer}>
            <p className={style.time}>Time left:{countdown / 1000}</p>
        </div>
    )
}