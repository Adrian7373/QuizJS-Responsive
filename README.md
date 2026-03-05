# QuizJS 🧠⏳

QuizJS is an interactive, fully responsive, timed trivia application built using **Next.js** and **React**. Test your knowledge with dynamically generated questions from the Open Trivia Database, beat the 15-second clock, and track your high score with immersive audio feedback!

### 🎮 Play the Live Demo: [https://adrian7373.github.io/QuizJS-Responsive/](https://adrian7373.github.io/QuizJS-Responsive/)

## 🚀 Features

* **Automated CI/CD Deployment:** Fully configured with GitHub Actions to automatically build and deploy to GitHub Pages on every push to the `main` branch.
* **Fully Responsive UI:** The layout has been polished to scale perfectly and provide a seamless, intuitive experience across desktops, tablets, and mobile devices.
* **Cross-Browser Audio Engine:** Features immersive background music and sound effects (success, wrong, game over). The audio engine handles strict mobile browser autoplay policies, ensuring sound works on iOS Safari and Android devices.
* **Dynamic Trivia:** Automatically fetches 10 random multiple-choice questions per game using the [Open Trivia Database (OpenTDB) API](https://opentdb.com/).
* **High Score Tracking:** Uses `localStorage` to automatically save and display your personal best score across different browser sessions.
* **Answer Reveal Mechanic:** After selecting an answer, the game briefly pauses to reveal the correct answer on a dedicated screen before moving to the next question.
* **Category & Difficulty Selection:** Customize your game by choosing from over 20 specific trivia categories and tailoring the challenge (Easy, Medium, Hard) to your skill level.
* **Smart Answer Shuffling:** Question choices are dynamically shuffled every time they render so the correct answer is never in the same place twice.
* **Countdown Timer:** The pressure is on! You have exactly 15 seconds to answer each question.
* **Global State Management:** Utilizes the React Context API to efficiently pass score and timer data down the component tree.

## 🛠️ Technologies Used

* **Framework:** [Next.js](https://nextjs.org/) (v16.1.6)
* **Library:** [React](https://react.dev/) (v19.2.3)
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
│       └── nextjs.yml          # GitHub Actions CI/CD pipeline for automated Pages deployment
├── public
│   └── sounds                  # Audio assets (bgmusic, start, success, wrong, finished)
├── src
│   ├── app
│   │   ├── page.jsx            # Main game routing, state management, and API fetching
│   │   └── page.module.css     # Main layout styling
│   ├── Components
│   │   ├── Category            # Dropdown for selecting specific trivia categories
│   │   ├── DifficultySelector  # Dropdown for selecting Easy/Medium/Hard
│   │   ├── Loading             # Custom loading spinner UI
│   │   ├── QuestionCard        # Renders questions, progress, and shuffled answer buttons
│   │   ├── Score               # Displays the current/final score
│   │   ├── ShowAnswer          # Screen that briefly reveals the correct answer
│   │   ├── StartButton         # Button to initialize/restart the game
│   │   └── Timer               # Renders the countdown timer (15s to 0s)
│   └── context
│       └── ScoreTime.jsx       # React Context for global score and timer state

```

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

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to start playing!

### 🌍 Automated GitHub Pages Deployment

This project features a continuous deployment pipeline. Whenever code is pushed to the `main` branch, the `.github/workflows/nextjs.yml` action automatically triggers a Next.js static export build and deploys the generated `out` folder directly to GitHub Pages. You can view the live automated build at [https://adrian7373.github.io/QuizJS-Responsive/](https://adrian7373.github.io/QuizJS-Responsive/).

Additionally, the application intelligently prepends the repository base path to static assets (like audio files) when running in the production environment, preventing `404 Not Found` errors.

## 🔮 Future Improvements

* **Smooth Transitions:** Add Framer Motion or pure CSS animations to smoothly fade between the question, answer reveal, and game over screens.
* **PWA Support:** Configure the Next.js app to work as a Progressive Web App so users can install it directly to their mobile home screens and play offline (if questions are cached).
* **Multiplayer/Shareable Results:** Add a "Share to X/Twitter" button at the end of the game so users can boast about their high scores.

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or UI improvements, feel free to fork the repository and submit a pull request.

---

Made with ❤️ by Adrian Ablaza
