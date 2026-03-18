import style from "./ShowAnswer.module.css";

interface ShowAnswerProps {
    correctAnswer: string;
}

export default function ShowAnswer({ correctAnswer }: ShowAnswerProps) {
    return (
        <div className={style.answerDiv}>
            <p>Correct Answer is</p>
            <p dangerouslySetInnerHTML={{ __html: correctAnswer }}></p>
        </div>
    )
}