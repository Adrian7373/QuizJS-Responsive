import { playSound } from "@/context/QuizContext";
import { State, quizAction } from "./quiz.types"

let bgmAudio: HTMLAudioElement | null = null;

export const quizReducer = (state: State, action: quizAction) => {
    switch (action.type) {
        case "difficulty_changed": {
            return {
                ...state,
                difficulty: action.payload
            }
        }
        case "category_changed": {
            return {
                ...state,
                category: action.payload
            }
        }
        case "user_answered": {

            if (!state.questions) return state;

            const isCorrect = action.payload === state.questions.results[state.questionIndex].correct_answer;

            if (isCorrect) {
                playSound("success.mp3");
            } else playSound("wrong.mp3");

            return {
                ...state,
                score: isCorrect ? state.score + 1 : state.score,
                isShowingAnswer: true,
                isRunning: false
            }
        }
        case "fetch_started": {
            return {
                ...state,
                isLoading: true
            }
        }
        case "fetch_finished": {
            if (!bgmAudio) {
                bgmAudio = playSound("bgmusic.mp3");
                bgmAudio.loop = true;
            }
            return {
                ...state,
                questions: action.payload,
                score: 0,
                questionIndex: 0,
                countdown: 15000,
                isLoading: false,
                isRunning: true,
                isShowingAnswer: false,
                isFinished: false
            }
        }
        case "time_ticked": {
            if (!state.questions) return state;

            if (action.payload === 0) {
                playSound("wrong.mp3");
                return {
                    ...state,
                    isShowingAnswer: true,
                    isRunning: false,
                    countdown: 0
                }
            }
            return {
                ...state,
                countdown: state.countdown - 1000
            }
        }
        case "answer_hidden": {
            if (!state.questions) return state;

            const isLastQuestion = state.questionIndex === state.questions.results.length - 1;

            if (isLastQuestion) {
                playSound("finished.mp3");
                bgmAudio?.pause();
                bgmAudio = null;
                return {
                    ...state,
                    isShowingAnswer: false,
                    isRunning: false,
                    isFinished: true
                }
            }
            return {
                ...state,
                isShowingAnswer: false,
                questionIndex: state.questionIndex + 1,
                countdown: 15000,
                isRunning: true
            }
        }
        default:
            return state;
    }
}