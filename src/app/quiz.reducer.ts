import { State, quizAction } from "./quiz.types"

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
            const isLastQuestion = state.questionIndex === state.questions.results.length - 1;

            return {
                ...state,
                score: isCorrect ? state.score + 1 : state.score,
                isRunning: isLastQuestion ? false : true,
                questionIndex: state.questionIndex + 1,
                countdown: 15000,
            }
        }
        case "fetch_started": {
            return {
                ...state,
                isLoading: true
            }
        }
        case "fetch_finished": {
            return {
                ...state,
                questions: action.payload,
                isLoading: false,
                isRunning: true
            }
        }
        case "time_ticked": {
            if (action.payload === 0) {
                if (state.questionIndex === state.questions.results.length) {
                    return {
                        ...state,
                        isRunning: false
                    }
                }
                return {
                    ...state,
                    questionIndex: state.questionIndex + 1,
                    countdown: 15000,
                }
            }
            return {
                ...state,
                countdown: state.countdown - 1000
            }
        }
        case "answer_showed": {
            return {
                ...state,
                isShowingAnswer: true
            }
        }
        case "answer_hidden": {
            return {
                ...state,
                isShowingAnswer: false
            }
        }
        default:
            return state;
    }
}