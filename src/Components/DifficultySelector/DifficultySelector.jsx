import style from "./DifficultySelector.module.css";

export default function DifficultySelector({ selectDifficulty, difficulty }) {
    return (
        <div className={style.difficultyDiv}>
            <select value={difficulty} onChange={(e) => selectDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    )
}