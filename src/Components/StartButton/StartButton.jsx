import style from "./StartButton.module.css";

export default function StartButton({ start, playAudio }) {

    return (
        <button className={style.startButton} onClick={() => {
            start();
            const startAudio = new Audio("/sounds/start.mp3");
            playAudio(startAudio);
        }}>
            Start
        </button>
    )
}