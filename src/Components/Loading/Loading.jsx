import style from "./Loading.module.css";

export default function Loading() {
    return (
        <div className={style.loadDiv}>
            <div className={style.spinner}></div>
            <p>Loading Questions...</p>
        </div>
    )
}