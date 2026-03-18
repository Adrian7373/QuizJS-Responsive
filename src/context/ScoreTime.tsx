import { createContext } from "react";

interface ScoreTimeContextType {
    score: number;
    countdown?: number;
}

export const ScoreTimeContext = createContext<ScoreTimeContextType | null>(null);