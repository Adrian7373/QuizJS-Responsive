import style from "./DifficultySelector.module.css";

interface DifficultySelectorProps {
    selectDifficulty: (selectedValue: string) => void;
    difficulty: string;
}

export default function DifficultySelector({ selectDifficulty, difficulty }: DifficultySelectorProps) {
    return (
        <div className={style.difficultyDiv}>
            <select className={style.select} value={difficulty} onChange={(e) => selectDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    )
}