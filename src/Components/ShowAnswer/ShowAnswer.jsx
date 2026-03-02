import style from "./ShowAnswer.module.css";

export default function ShowAnswer({ correctAnswer }) {
    return (
        <div className={style.answerDiv}>
            <p>Correct Answer is</p>
            <p dangerouslySetInnerHTML={{ __html: correctAnswer }}></p>
        </div>
    )
}