"use client";

import { useState, useEffect, useRef } from "react";
import style from "./page.module.css";
import QuestionCard from "@/Components/QuestionCard/QuestionCard";
import Score from "@/Components/Score/Score";
import Timer from "@/Components/Timer/Timer";
import StartButton from "@/Components/StartButton/StartButton";
import { ScoreTimeContext } from "@/context/ScoreTime";
import DifficultySelector from "@/Components/DifficultySelector/DifficultySelector";
import Loading from "@/Components/Loading/Loading";
import Category from "@/Components/Category/Category";
import ShowAnswer from "@/Components/ShowAnswer/ShowAnswer";

export default function Home() {

  const [questions, setQuestions] = useState(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(15000);
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("");
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);
  const intervalRef = useRef(null);

  const fetchQuestions = async () => {
    try {
      if (!category) {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } else {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (questions && isRunning && !isLoading && !isShowingAnswer) {
      setCountdown(15000);
      intervalRef.current = setInterval(() => {
        setCountdown((prevTime) => prevTime - 1000);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [questionIndex, isRunning, isLoading, isShowingAnswer])


  useEffect(() => {
    if (countdown <= 0) {
      setQuestionIndex((index) => index + 1);
    }
  }, [countdown]);

  const checkAnswer = (answer) => {
    setIsShowingAnswer(true);
    setTimeout(() => {
      if (answer === questions.results[questionIndex].correct_answer) {
        setScore((prevScore) => prevScore + 1);
      }
      setQuestionIndex((prevIndex) => prevIndex + 1)
      setIsShowingAnswer(false);
    }, 3000);
  }


  const startGame = () => {
    setIsLoading(true);
    setQuestionIndex(0);
    setScore(0);
    fetchQuestions();
    setIsRunning(true);
  }

  const selectDifficulty = (difficulty) => {
    setQuestions(null);
    setDifficulty(difficulty);
    setIsRunning(false);
  }

  const selectCategory = (category) => {
    setQuestions(null);
    setCategory(category);
    setIsRunning(false);
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  const isFinished = questions?.results && questionIndex >= questions.results.length;
  if (isFinished) {
    const prevHighScore = localStorage.getItem("highscore")
    if (prevHighScore) {
      if (score > prevHighScore)
        localStorage.setItem("highscore", score);
    } else {
      localStorage.setItem("highscore", score);
    }
  }

  if (isShowingAnswer) {
    return (
      <ShowAnswer
        correctAnswer={questions.results[questionIndex].correct_answer}
      />
    )
  }

  if (questions && !isFinished && isRunning) {
    return (
      <div className={style.mainDiv}>
        <ScoreTimeContext.Provider value={{
          score,
          countdown
        }}>
          <QuestionCard
            result={questions.results[questionIndex]}
            checkAnswer={checkAnswer}
            score={<Score />}
            timer={<Timer />}
            questionIndex={questionIndex}
          ></QuestionCard>
        </ScoreTimeContext.Provider>
      </div>
    )
  } else if (!isRunning) {
    return (
      <div className={style.initialDiv}>
        <p>Start Game</p>
        <DifficultySelector
          selectDifficulty={selectDifficulty}
          difficulty={difficulty}
        />
        <Category
          category={category}
          selectCategory={selectCategory}
        />
        < StartButton
          start={startGame}
        />
      </div>
    )
  } else {
    return (
      <div className={style.gameOverDiv}>
        <p>Congratulations!</p>
        <ScoreTimeContext.Provider value={{ score }}>
          <Score
            score={score}
          />
          <p className={style.highScore}>Highest Score: {localStorage.getItem("highscore")}</p>
        </ScoreTimeContext.Provider>
        <DifficultySelector
          selectDifficulty={selectDifficulty}
          difficulty={difficulty}
        />
        <Category
          category={category}
          selectCategory={selectCategory}
        />
        <StartButton
          start={startGame}
        />
      </div>
    )
  }
}