
export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface Response {
    response_code: number;
    results: Question[];
}

export interface State {
    questions: Response | null;
    score: number;
    questionIndex: number;
    countdown: number;
    isLoading: boolean;
    isRunning: boolean;
    difficulty: "easy" | "medium" | "hard";
    category: string;
    isShowingAnswer: boolean;
}

export type Difficulty = "easy" | "medium" | "hard";

export type quizAction =
    // User Actions
    | { type: "difficulty_changed", payload: Difficulty }
    | { type: "category_changed", payload: string }
    | { type: "user_answered", payload: string }
    // System
    | { type: "fetch_started" }
    | { type: "fetch_finished", payload: Response }
    | { type: "time_ticked", payload: number }
    | { type: "answer_showed" }
    | { type: "answer_hidden" }
