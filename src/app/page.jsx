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

const basePath = process.env.NODE_ENV === "production" ? "/QuizJS-Responsive" : "";

export default function Home() {

  interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }

  interface Response {
    response_code: number;
    results: Question[];
  }

  const [questions, setQuestions] = useState < Response | null > (null);
  const [score, setScore] = useState < number > (0);
  const [questionIndex, setQuestionIndex] = useState < number > (0);
  const [countdown, setCountdown] = useState < number > (15000);
  const [isLoading, setIsLoading] = useState < boolean > (false);
  const [isRunning, setIsRunning] = useState < boolean > (false);
  const [difficulty, setDifficulty] = useState < string > ("easy");
  const [category, setCategory] = useState < string > ("");
  const [isShowingAnswer, setIsShowingAnswer] = useState < boolean > (false);
  const intervalRef = useRef(null);
  const bgmusicRef = useRef(null)

  const isFinished = questions?.results && questionIndex >= questions.results.length;

  useEffect(() => {
    if (!bgmusicRef.current) {
      bgmusicRef.current = new Audio(`${basePath}/sounds/bgmusic.mp3`);
      bgmusicRef.current.loop = true;
    }

    if (isRunning && !isFinished) {
      bgmusicRef.current.volume = 0.5;
      playAudio(bgmusicRef.current);
    } else {
      stopAudio(bgmusicRef.current);
    }
  }, [isRunning, isFinished]);

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
    if (questions && isRunning && !isLoading && !isShowingAnswer && !isFinished) {
      setCountdown(15000);
      intervalRef.current = setInterval(() => {
        setCountdown((prevTime) => prevTime - 1000);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [questionIndex, isRunning, isLoading, isShowingAnswer])

  useEffect(() => {
    if (countdown <= 0 && !isShowingAnswer && !isFinished && isRunning) {

      playAudio(new Audio(`${basePath}/sounds/wrong.mp3`));
      setIsShowingAnswer(true);

      setTimeout(() => {
        setIsShowingAnswer(false);
        setQuestionIndex((index) => index + 1);
      }, 3000);
    }
  }, [countdown]);

  useEffect(() => {
    if (isFinished) {
      playAudio(new Audio(`${basePath}/sounds/finished.mp3`));
      const prevHighScore = localStorage.getItem("highscore");
      if (prevHighScore) {
        if (score > prevHighScore) localStorage.setItem("highscore", score);
      } else {
        localStorage.setItem("highscore", score);
      }
      setQuestions(null);
    }
  }, [isFinished]);

  const checkAnswer = (answer) => {
    if (answer === questions.results[questionIndex].correct_answer) {
      playAudio(new Audio(`${basePath}/sounds/success.mp3`))
    } else playAudio(new Audio(`${basePath}/sounds/wrong.mp3`))
    setIsShowingAnswer(true);
    setTimeout(() => {
      if (answer === questions.results[questionIndex].correct_answer) {
        setScore((prevScore) => prevScore + 1);
      }
      setQuestionIndex((prevIndex) => prevIndex + 1)
      setIsShowingAnswer(false);
    }, 3000);
  }

  const playAudio = (audio) => {
    audio.play().catch((err) => {
      console.log("Audio play failed:", err);
    })
  }

  const stopAudio = (audio) => {
    audio.pause();
    audio.currentTime = 0;
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
            questionIndex={questionIndex}
            score={<Score />}
            timer={<Timer />}
          />
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
          playAudio={playAudio}
        />
      </div>
    )
  } else {
    return (
      <div className={style.gameOverDiv}>
        <p>Congratulations!!!</p>
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
          playAudio={playAudio}
        />
      </div>
    )
  }
}