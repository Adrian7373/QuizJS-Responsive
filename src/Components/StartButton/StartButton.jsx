import style from "./StartButton.module.css";

const basePath = process.env.NODE_ENV === "production" ? "/quizjs-responsive" : "";

export default function StartButton({ start, playAudio }) {

    return (
        <button className={style.startButton} onClick={() => {
            start();
            const startAudio = new Audio(`${basePath}/sounds/start.mp3`);
            playAudio(startAudio);
        }}>
            Start
        </button>
    )
}