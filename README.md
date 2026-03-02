# QuizJS 🧠⏳

QuizJS is an interactive, timed trivia application built using **Next.js** and **React**. Test your knowledge with dynamically generated questions from the Open Trivia Database, beat the 15-second clock, and track your high score!

## 🚀 Features

* **Dynamic Trivia:** Automatically fetches 10 random multiple-choice questions per game using the [Open Trivia Database (OpenTDB) API](https://opentdb.com/).
* **High Score Tracking:** Uses `localStorage` to automatically save and display your personal best score across different browser sessions.
* **Answer Reveal mechanic:** After selecting an answer, the game briefly pauses to reveal the correct answer on a dedicated screen before moving to the next question.
* **Progress Indicator:** Keeps you informed of your current progress during the quiz (e.g., "Question 1 of 10").
* **Category Selection:** Customize your game by choosing from over 20 specific trivia categories (including Science, History, Video Games, Anime, and more) or stick to mixed general knowledge.
* **Difficulty Selection:** Tailor the challenge to your skill level by choosing between Easy, Medium, or Hard before starting a game.
* **Smart Answer Shuffling:** Question choices are dynamically shuffled every time they render so the correct answer is never in the same place twice.
* **Countdown Timer:** The pressure is on! You have exactly 15 seconds to answer each question.
* **Dedicated Game Screens:** Features clean UI transitions between the Initial Start screen, the active Quiz, the Answer Reveal, and a "Congratulations!" Game Over screen.
* **Global State Management:** Utilizes the React Context API to efficiently pass score and timer data down the component tree.

## 🛠️ Technologies Used

* **Framework:** [Next.js](https://nextjs.org/) (v16.1.6)
* **Library:** [React](https://react.dev/) (v19.2.3)
* **State Management:** React Context API & LocalStorage
* **API:** [Open Trivia Database](https://opentdb.com/)
* **Styling:** CSS Modules

## 📂 Project Structure

```text
/src
├── app
│   ├── page.jsx                # Main game routing, state management, and API fetching
│   └── page.module.css         # Main layout styling
├── Components
│   ├── Category                # Dropdown for selecting specific trivia categories
│   ├── DifficultySelector      # Dropdown for selecting Easy/Medium/Hard
│   ├── Loading                 # Custom loading spinner UI
│   ├── QuestionCard            # Renders questions, progress, and shuffled answer buttons
│   ├── Score                   # Displays the current/final score
│   ├── ShowAnswer              # Screen that briefly reveals the correct answer
│   ├── StartButton             # Button to initialize/restart the game
│   └── Timer                   # Renders the countdown timer (15s to 0s)
└── context
    └── ScoreTime.jsx           # React Context for global score and timer state

```

## 🔧 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install

```

Then, run the development server:

```bash
npm run dev
# or
yarn dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to start playing!

## 🔮 Future Improvements

* **Audio Feedback:** Add short, satisfying sound effects for correct answers, wrong answers, and when the timer is running low.
* **Mobile Responsiveness:** Polish the UI to ensure buttons and layouts scale perfectly on smaller devices.

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or UI improvements, feel free to fork the repository and submit a pull request.

---

Made with ❤️ by Adrian Ablaza
