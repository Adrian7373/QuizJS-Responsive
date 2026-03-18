import { createContext } from "react";

interface ScoreTimeContextType {
    countdown: number;
    time?: number;
}

export const ScoreTimeContext = createContext < ScoreTimeContextType | null > (null);