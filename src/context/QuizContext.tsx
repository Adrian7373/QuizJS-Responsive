import { quizReducer } from "@/app/quiz.reducer";
import { quizAction, State } from "@/app/quiz.types";
import { createContext, useContext, useReducer, ReactNode, Children } from "react";

const QuizStateContext = createContext<State | null>(null);
const QuizDispatchContext = createContext<React.Dispatch<quizAction>>(null);

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
};

export function QuizProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    return (
        <QuizStateContext.Provider value={state}>
            <QuizDispatchContext value={dispatch}>
                {children}
            </QuizDispatchContext>
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