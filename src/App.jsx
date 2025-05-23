import { useState } from "react";
import "./App.css";

const numbers = Array.from({ length: 10 }, (_, i) => i);
console.log(numbers);

function App() {
  const [clickedNumbers, setClickedNumbers] = useState([]);
  const [result, setResult] = useState(null);

  const handleClick = (num) => {
    setClickedNumbers((prev) => {
      if (prev.length > 0 && prev[prev.length - 1] === "*" && num === "*") {
        return [...prev.slice(0, -1), "**"];
      }
      return [...prev, num];
    });
  };

  const getTheResultOfBasicOperations = (a, b, operation) => {
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return a - b;

      case "/":
        if (b === 0) {
          return "Error: Division by zero";
        }
        return a / b;

      case "*":
        return a * b;

      case "**":
        return a ** b;

      case "%":
        return (a * b) / 100;

      case "√":
        return Math.sqrt(a);

      default:
        return null;
    }
  };

  const calculateResult = () => {
    const operators = ["+", "-", "*", "/", "**", "√", "%"];
    const opIndex = clickedNumbers.findIndex((el) => operators.includes(el));
    if (opIndex === -1) {
      setResult("No operation found");
      return;
    }

    const leftArr = clickedNumbers.slice(0, opIndex);
    const rightArr = clickedNumbers.slice(opIndex + 1);

    const leftNum = Number(leftArr.join(""));
    const rightNum = Number(rightArr.join(""));
    const operator = clickedNumbers[opIndex];

    if (isNaN(leftNum) || isNaN(rightNum)) {
      setResult("Invalid input");
      return;
    }

    const res = getTheResultOfBasicOperations(leftNum, rightNum, operator);
    setResult(res);
  };

  const clearResult = () => {
    setClickedNumbers([]);
    setResult(null);
  };

  return (
    <>
      <header>
        <h2>Calculator HW42</h2>
      </header>

      <div className="operations">
        <p>{clickedNumbers.join("")} </p>
        <h3>{result !== null ? result : ""}</h3>
      </div>

      <div className="buttons">
        <div className="numbers">
          {numbers.map((number) => (
            <button
              onClick={() => {
                handleClick(number);
              }}
              key={number}
            >
              {number}
            </button>
          ))}
        </div>

        <div className="operators">
          {["+", "-", "/", "*"].map((op) => (
            <button onClick={() => handleClick(op)} key={op}>
              {op}
            </button>
          ))}

          <button onClick={() => handleClick("√")} key="sqrt">
            √
          </button>
          <button onClick={() => handleClick("**")} key="exponent">
            (x)ʸ
          </button>
          <button onClick={() => handleClick("%")} key="percentage">
            %
          </button>
          <button onClick={calculateResult} key="equals">
            =
          </button>

          <button key="clear" onClick={clearResult}>
            {" "}
            C
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
