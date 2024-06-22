import React, { useEffect, useState } from "react";
import "./Board.css";

const initialBoard = [
	["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	["X", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
	["X", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X"],
	["X", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X"],
	["X", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X"],
	["X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X"],
	["X", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X"],
	["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
	["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
	["X", "0", "0", "0", "X", "0", "0", "0", "0", "Y", "0", "X"],
	["X", "0", "0", "X", "X", "X", "0", "0", "0", "0", "0", "X"],
	["X", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "X"],
	["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
	["X", "0", "0", "Y", "0", "0", "0", "0", "0", "0", "0", "X"],
	["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
	["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];

const directions = [
	{ x: 1, y: 1 },
	{ x: 1, y: -1 },
	{ x: -1, y: 1 },
	{ x: -1, y: -1 },
];

const getRandomDirection = () => {
	return directions[Math.floor(Math.random() * directions.length)];
};

const getRandomCorner = () => {
	const corners = [
		{ x: 1, y: 1 },
		{ x: 7, y: 10 },
		{ x: 14, y: 10 },
		// { x: 13, y: 7 },
	];
	return corners[Math.floor(Math.random() * corners.length)];
};

const Board = () => {
	const [ballPosition, setBallPosition] = useState(getRandomCorner());
	const [currentDirection, setCurrentDirection] = useState(getRandomDirection());

	const [board, setBoard] = useState(() => {
		const initial = initialBoard.map((row) => row.slice());
		initial[ballPosition.x][ballPosition.y] = "1";
		return initial;
	});

	useEffect(() => {
		const interval = setInterval(() => {
			moveBall();
		}, 300);

		return () => clearInterval(interval);
	}, [ballPosition, currentDirection]);

	const moveBall = () => {
		let newX = ballPosition.x + currentDirection.x;
		let newY = ballPosition.y + currentDirection.y;

		if (board[newX][newY] === "X") {
			if (board[ballPosition.x][newY] === "X") {
				setCurrentDirection((dir) => ({ ...dir, y: -dir.y }));
			} else if (board[newX][ballPosition.y] === "X") {
				setCurrentDirection((dir) => ({ ...dir, x: -dir.x }));
			} else {
				setCurrentDirection((dir) => ({ x: -dir.x, y: -dir.y }));
			}
		} else {
			if (board[newX][newY] === "Y") {
				setCurrentDirection(getRandomDirection());
				setBoard((prevBoard) => {
					const newBoard = prevBoard.map((row) => row.slice());
					newBoard[newX][newY] = "0";
					return newBoard;
				});
			}

			setBoard((prevBoard) => {
				const newBoard = prevBoard.map((row) => row.slice());
				newBoard[ballPosition.x][ballPosition.y] = "0";
				newBoard[newX][newY] = "1";
				return newBoard;
			});
			setBallPosition({ x: newX, y: newY });
		}
	};

	return (
		<div className="board">
			{board.map((row, rowIndex) => (
				<div key={rowIndex} className="row">
					{row.map((cell, cellIndex) => (
						<div
							key={cellIndex}
							className={`cell ${
								cell === "0"
									? "board"
									: cell === "X"
									? "border"
									: cell === "Y"
									? "randomBounce"
									: cell === "1"
									? "ball"
									: ""
							}`}
						>
							{cell === "1" ? (
								<img src="/ball.png" alt="ball" className="ball-image" />
							) : (
								cell
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
