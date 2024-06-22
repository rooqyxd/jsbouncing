import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";

function App() {
	const [isActive, setIsActive] = useState(false);
	return (
		<div className="game">
			<p>Bouncing Ball</p>
			<button
				className={isActive ? "action-btn activated" : "action-btn notactive"}
				onClick={() => setIsActive(!isActive)}
			>
				{isActive ? "Stop" : "Start bouncing"}
			</button>
			{isActive ? <Board /> : ""}
		</div>
	);
}

export default App;
