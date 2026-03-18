import style from "./StartButton.module.css";

const basePath = process.env.NODE_ENV === "production" ? "/QuizJS-Responsive" : "";

interface StartButtonProps {
    start: () => void;
    playAudio: (audio: HTMLAudioElement) => void;
}

export default function StartButton({ start, playAudio }: StartButtonProps) {

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