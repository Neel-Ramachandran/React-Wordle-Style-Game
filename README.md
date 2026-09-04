# NEELE - Category-Based Wordle Game

## Project Overview
A React-based word guessing game inspired by Wordle.

## Video Link
https://youtu.be/AhFoQBbOGS8

## Features
- Multiple word categories (Food, Sports, Animals, Countries, Family, Random)
- Color-coded feedback system:
  - Green: Correct letter in correct position
  - Yellow: Correct letter in wrong position
  - Gray: Letter not in the word
- Win/Loss screens with play again functionality
- Responsive design with gradient backgrounds

## Technologies Used
- React 18
- JavaScript (ES6+)
- CSS3
- Node.js & npm

## Installation and Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation Steps
1. Clone this repository:
```bash
   git clone https://github.com/Neel-Ramachandran/React-Wordle-Style-Game.git
   cd React-Wordle-Style-Game
```

2. Install dependencies:
```bash
   npm install
```

3. Start the development server:
```bash
   npm start
```

4. The game will automatically open in your browser at `http://localhost:3000`

## How to Run the Program

1. **Start the application** using `npm start`
2. **Select a category** from the main menu (Food, Sports, Animals, Countries, Family, or Random)
3. **Type your 5-letter guess** using your keyboard
4. **Press Enter** to submit your guess
5. **Observe the color feedback** to refine your next guess
6. **Win** by guessing the word in 6 tries or less, or **lose** if you run out of attempts
7. **Click "Play Again"** to return to category selection

## Project Structure
```
wordle-game/
├── code/           # Source code files
├── src/            # Create React App entry point and default assets
├── tests/          # Test files
├── docs/           # Screenshots and documentation
├── report/         # Final project report
├── README.md       # This file
└── package.json    # Project dependencies
```

## File Descriptions

### Code Files
- `App.js` - Main React component containing game logic and UI
- `App.css` - Styling for the entire application
- `index.js` - React entry point
- `index.css` - Global styles

### Key Components
- **Category Selection Screen** - Allows users to choose word category
- **Game Screen** - Main gameplay interface with letter grid
- **Win/Loss Screens** - End game displays with results

## Author
Neel Ramachandran

## Contribution Summary
- Designed and implemented category-based word selection system
- Created responsive UI with color-coded feedback
