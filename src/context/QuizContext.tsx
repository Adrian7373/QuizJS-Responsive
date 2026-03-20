"use client";

import { quizReducer } from "@/app/quiz.reducer";
import { quizAction, State } from "@/app/quiz.types";
import { createContext, useContext, useReducer, useEffect, useRef, ReactNode } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/QuizJS-Responsive" : "";
const QuizStateContext = createContext<State | null>(null);
const QuizDispatchContext = createContext<React.Dispatch<quizAction> | null>(null);

export const initialState: State = {
    questions: null,
    score: 0,
    questionIndex: 0,
    countdown: 15000,
    isLoading: false,
    isRunning: false,
    difficulty: "easy",
    category: "",
    isShowingAnswer: false,
    isFinished: false
};

export const playSound = (soundFile: string) => {
    const audio = new Audio(`${basePath}/sounds/${soundFile}`)
    audio.play().catch(err => console.log("Audio failed to play:", err))
    return audio;
}

export function QuizProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(quizReducer, initialState);
    const bgmAudioRef = useRef<HTMLAudioElement | null>(null);
    const prevStateRef = useRef<State>(initialState);

    useEffect(() => {
        const prev = prevStateRef.current;

        // Quiz started: questions fetched for the first time
        if (!prev.questions && state.questions) {
            if (!bgmAudioRef.current) {
                bgmAudioRef.current = playSound("bgmusic.mp3");
                bgmAudioRef.current.loop = true;
            }
        }

        // Answer revealed: correct answer scores a point, otherwise wrong/timeout
        if (!prev.isShowingAnswer && state.isShowingAnswer) {
            if (state.score > prev.score) {
                playSound("success.mp3");
            } else {
                playSound("wrong.mp3");
            }
        }

        // Quiz finished
        if (!prev.isFinished && state.isFinished) {
            playSound("finished.mp3");
            if (bgmAudioRef.current) {
                bgmAudioRef.current.pause();
                bgmAudioRef.current = null;
            }
        }

        prevStateRef.current = state;
    }, [state]);

    return (
        <QuizStateContext.Provider value={state}>
            <QuizDispatchContext.Provider value={dispatch}>
                {children}
            </QuizDispatchContext.Provider>
        </QuizStateContext.Provider>
    )
}

export const useQuizState = () => {
    const context = useContext(QuizStateContext);
    if (!context) {
        throw new Error("useQuizState must be used within a QuizProvider")
    }
    return context;
}

export const useQuizDispatch = () => {
    const context = useContext(QuizDispatchContext);
    if (!context) {
        throw new Error("useQuizDispatch must be used within a QuizProvider")
    }
    return context;
}