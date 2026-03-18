# QuizJS 🧠⏳

QuizJS is an interactive, fully responsive, timed trivia application built using **Next.js**, **React**, and **TypeScript**. Test your knowledge with dynamically generated questions from the Open Trivia Database, beat the 15-second clock, and track your high score with immersive audio feedback!

### 🎮 Play the Live Demo: [https://adrian7373.github.io/QuizJS-Responsive/](https://adrian7373.github.io/QuizJS-Responsive/)

## 🚀 Features

* **TypeScript Integration:** Recently migrated to TypeScript to ensure robust type safety and a better developer experience.
* **Automated CI/CD Deployment:** Fully configured with GitHub Actions to automatically build and deploy to GitHub Pages on every push to the `main` branch.
* **Fully Responsive UI:** The layout scales perfectly to provide a seamless experience across desktops, tablets, and mobile devices.
* **Cross-Browser Audio Engine:** Features immersive background music and sound effects (success, wrong, game over) engineered to handle strict mobile browser autoplay policies.
* **Dynamic Trivia:** Automatically fetches 10 random multiple-choice questions per game using the [Open Trivia Database (OpenTDB) API](https://opentdb.com/).
* **High Score Tracking:** Uses `localStorage` to save and display your personal best score across different sessions.
* **Answer Reveal Mechanic:** After selecting an answer, the game briefly pauses to reveal the correct answer on a dedicated screen.
* **Category & Difficulty Selection:** Customize your game by choosing from over 20 categories and adjusting the challenge level.
* **Smart Answer Shuffling:** Question choices are dynamically shuffled so the correct answer is never in the same place twice.
* **Countdown Timer:** You have exactly 15 seconds to answer each question.
* **Global State Management:** Utilizes the React Context API to pass score and timer data down the component tree.

## 🛠️ Technologies Used

* **Framework:** [Next.js](https://nextjs.org/) (v16.1.6)
* **Library:** [React](https://react.dev/) (v19.2.3)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **CI/CD:** GitHub Actions
* **Performance Tooling:** React Scan
* **State Management:** React Context API & LocalStorage
* **API:** [Open Trivia Database](https://opentdb.com/)
* **Assets:** HTML5 Audio API
* **Styling:** CSS Modules

## 📂 Project Structure

```text
/
├── .github
│   └── workflows
│       └── nextjs.yml          # CI/CD pipeline for automated deployment
├── public
│   └── sounds                  # Audio assets (bgmusic, start, success, wrong, finished)
├── src
│   ├── app
│   │   ├── page.tsx            # Main game routing and logic
│   │   └── page.module.css     # Main layout styling
│   ├── Components
│   │   ├── Category            # Category selection component
│   │   ├── DifficultySelector  # Difficulty selection component
│   │   ├── Loading             # Custom loading spinner
│   │   ├── QuestionCard        # Questions and shuffled answers
│   │   ├── Score               # Score display component
│   │   ├── ShowAnswer          # Answer reveal screen
│   │   ├── StartButton         # Game initialization button
│   │   └── Timer               # Countdown timer component
│   └── context
│       └── ScoreTime.tsx       # Global state context
└── tsconfig.json               # TypeScript configuration
````

## 🔧 Getting Started & Local Development

If you want to run the code locally, first install the dependencies:

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

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to start playing\!

### 🌍 Automated GitHub Pages Deployment

This project features a continuous deployment pipeline. Whenever code is pushed to the `main` branch, the `.github/workflows/nextjs.yml` action automatically triggers a Next.js static export build and deploys it to GitHub Pages.

## 🤝 Contributing

Contributions are welcome\! Feel free to fork the repository and submit a pull request.

-----

Made with ❤️ by Adrian Ablaza
