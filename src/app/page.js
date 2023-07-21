"use client";

import { useEffect, useState } from "react";

export default function Home() {
  let totalGridSize = 20;

  let snakeIntialPosition = [
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2,
    },
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2 + 1,
    },
  ];

  // Game State
  const [score, setScore] = useState(0);
  const [food, setFood] = useState({
    x: 5,
    y: 5,
  });
  const [snake, setSnake] = useState(snakeIntialPosition);
  const [direction, setDirection] = useState("LEFT");

  function renderBoard() {
    let cellArray = [];

    for (let row = 0; row < totalGridSize; row++) {
      for (let col = 0; col < totalGridSize; col++) {
        let classes = "cell";

        let isFood = food.x === row && food.y === col;

        let isSnakeHead = snake[0].x === row && snake[0].y === col;

        let isSnake = snake.some((ele) => ele.x === row && ele.y === col);

        if (isFood) {
          classes = `${classes} food`;
        }

        if (isSnake) {
          classes = `${classes} snake`;
        }

        if (isSnakeHead) {
          classes = `${classes} snake-head`;
        }

        let cell = <div key={`${row}-${col}`} className={classes}></div>;

        cellArray.push(cell);
      }
    }

    return cellArray;
  }

  function renderFood() {
    let randomX = Math.floor(Math.random() * totalGridSize);
    let randomY = Math.floor(Math.random() * totalGridSize);

    setFood({
      x: randomX,
      y: randomY,
    });
  }

  function gameOver() {
    setSnake(snakeIntialPosition);
    setScore(0);
  }

  function updateGame() {
    // Checking For Game Over
    if (
      snake[0].x < 0 ||
      snake[0].x > 20 ||
      snake[0].y < 0 ||
      snake[0].y > 20
    ) {
      gameOver();
      return;
    }

    // Checking If snake bit itself
    const isBit = snake
      .slice(1)
      .some((ele) => ele.x === snake[0].x && ele.y === snake[0].y);
    if (isBit) {
      gameOver();
      return;
    }

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

    // checking if food was eaten on not
    if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
      // Ate Food
      setScore((sco) => sco + 1);
      renderFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function updateDirection(e) {
    let key = e.code;

    switch (key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
    }
  }

  // Handle Events and Effects
  useEffect(() => {
    let moveSnake = setInterval(updateGame, 150);
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
