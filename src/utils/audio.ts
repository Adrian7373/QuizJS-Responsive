const basePath = process.env.NODE_ENV === "production" ? "/QuizJS-Responsive" : "";

export const playSound = (soundFile: string): HTMLAudioElement => {
    const audio = new Audio(`${basePath}/sounds/${soundFile}`);
    audio.play().catch(err => console.log("Audio failed to play:", err));
    return audio;
}
