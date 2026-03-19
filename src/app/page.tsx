"use client";

import { useState, useEffect, useRef } from "react";
import style from "./page.module.css";
import QuestionCard from "@/Components/QuestionCard/QuestionCard";
import Score from "@/Components/Score/Score";
import Timer from "@/Components/Timer/Timer";
import StartButton from "@/Components/StartButton/StartButton";
import DifficultySelector from "@/Components/DifficultySelector/DifficultySelector";
import Loading from "@/Components/Loading/Loading";
import Category from "@/Components/Category/Category";
import ShowAnswer from "@/Components/ShowAnswer/ShowAnswer";
import { QuizProvider, useQuizDispatch, useQuizState } from "@/context/QuizContext";

const basePath = process.env.NODE_ENV === "production" ? "/QuizJS-Responsive" : "";

export default function Home() {
  return (
    <QuizProvider>
      <QuizMain />
    </QuizProvider>
  )
}

function QuizMain() {
  const state = useQuizState();
  const dispatch = useQuizDispatch();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.questions && state.isRunning && !state.isLoading) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: "time_ticked", payload: state.countdown })
      }, 1000)
    }
    if (intervalRef.current)
      return () => clearInterval(intervalRef.current);
  }, [state.isRunning, state.countdown, dispatch]);


  const fetchQuestions = async () => {
    dispatch({ type: "fetch_started" })
    try {
      if (!state.category) {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${state.difficulty}&type=multiple`);
        const data = await response.json();
        dispatch({ type: "fetch_finished", payload: data })
      } else {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${state.category}&difficulty=${state.difficulty}&type=multiple`);
        const data = await response.json();
        dispatch({ type: "fetch_finished", payload: data })
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  if (state.isLoading) {
    return (
      <Loading />
    )
  }

  if (state.isShowingAnswer) {
    return (
      <ShowAnswer />
    )
  }

  if (state.questions && state.isRunning) {
    return (
      <div className={style.mainDiv}>
        <QuestionCard
          score={<Score />}
          timer={<Timer />}
        />
      </div>
    )
  } else if (!state.isRunning) {
    return (
      <div className={style.initialDiv}>
        <p>Start Game</p>
        <DifficultySelector
        />
        <Category
        />
        < StartButton
          fetchQuestions={fetchQuestions}
        />
      </div>
    )
  } else {
    return (
      <div className={style.gameOverDiv}>
        <p>Congratulations!!!</p>
        <Score />
        <p className={style.highScore}>Highest Score: {localStorage.getItem("highscore")}</p>
        <DifficultySelector
        />
        <Category
        />
        <StartButton
          fetchQuestions={fetchQuestions}
        />
      </div>
    )
  }
}