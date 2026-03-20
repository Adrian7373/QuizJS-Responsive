"use client";

import { quizReducer } from "@/app/quiz.reducer";
import { quizAction, State } from "@/app/quiz.types";
import { createContext, useContext, useReducer, ReactNode } from "react";
export { playSound } from "@/utils/audio";
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

export function QuizProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(quizReducer, initialState);

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

