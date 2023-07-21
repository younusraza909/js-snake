"use client";

import { useEffect, useState } from "react";

export default function Home() {
  let totalGridSize = 20;

  // Game State
  const [score, setScore] = useState(0);
  const [food, setFood] = useState({
    x: 5,
    y: 5,
  });
  const [snake, setSnake] = useState([
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2,
    },
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2 + 1,
    },
  ]);
  const [direction, setDirection] = useState("LEFT");

  function renderBoard() {
    let cellArray = [];

    for (let row = 0; row < totalGridSize; row++) {
      for (let col = 0; col < totalGridSize; col++) {
        let classes = "cell";

        let isFood = food.x === row && food.y === col;

        let isSnake = snake.some((ele) => ele.x === row && ele.y === col);

        if (isFood) {
          classes = `${classes} food`;
        }

        if (isSnake) {
          classes = `${classes} snake food`;
        }

        let cell = <div key={`${row}-${col}`} className={classes}></div>;

        cellArray.push(cell);
      }
    }

    return cellArray;
  }

  function updateGame() {
    let newSnake = [...snake];
    if (direction === "UP") {
      newSnake.unshift({ x: newSnake[0].x - 1, y: newSnake[0].y });
    }
    if (direction === "DOWN") {
      newSnake.unshift({ x: newSnake[0].x + 1, y: newSnake[0].y });
    }
    if (direction === "LEFT") {
      newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y - 1 });
    }
    if (direction === "RIGHT") {
      newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y + 1 });
    }

    newSnake.pop();

    setSnake(newSnake);
  }

  function updateDirection(e) {
    let key = e.code;

    switch (key) {
      case "ArrowUp":
        setDirection("UP");
        break;
      case "ArrowDown":
        setDirection("DOWN");
        break;
      case "ArrowLeft":
        setDirection("LEFT");
        break;
      case "ArrowRight":
        setDirection("RIGHT");
        break;
    }
  }

  console.log("direction", direction);

  // Handle Events and Effects
  useEffect(() => {
    let moveSnake = setInterval(updateGame, 500);
    return () => clearInterval(moveSnake);
  });

  useEffect(() => {
    document.addEventListener("keydown", updateDirection);

    return () => document.removeEventListener("keydown", updateDirection);
  });

  return (
    <main className='main'>
      <div className='score'>
        Score : <span>{score}</span>
      </div>
      <div className='board'>{renderBoard()}</div>
    </main>
  );
}
