import "../assets/css/wordle.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./Square";
import KeyBoard from "./KeyBoard";

export default function Wordle() {
  const words = [
    "ARBOL",
    "PLUMA",
    "NIEVE",
    "ROCAS",
    "LLAVE",
    "SOLAR",
    "JUGAR",
    "AUDIO",
    "PERROS",
    "COMER",
    "MARCAS",
    "FUMAR",
  ];

  const [word, setWord] = useState(getRandomWord());
  const [wordArray, setWordArray] = useState(
    Array(5).fill(Array(5).fill(null))
  );
  const [input, setInput] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [winner, setWinner] = useState(null);

  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function handleKeyPress(key) {
    if (key === "Enter") {
      if (input.length === word.length) {
        // Verifica que el input tenga la longitud correcta
        handleForm(); // Procesa la palabra ingresada
      }
    } else if (key == "Eliminar") {
      const newInput = input.slice(0, -1); //muestra todas las letras menos la ultima
      setInput(newInput);

      // Se clona el array para evitar mutaciones no deseadas
      const newWordArray = [...wordArray];

      // Se clona la fila actual
      newWordArray[attempt] = [...newWordArray[attempt]];

      // Se agrega la letra
      newWordArray[attempt][input.length - 1] = null;

      setWordArray(newWordArray);
    } else if (key.length === 1 && input.length < word.length) {
      // Clona wordArray para evitar mutaciones directas
      const newWordArray = [...wordArray];
      newWordArray[attempt] = [...newWordArray[attempt]];

      // Actualiza la posición correcta con la nueva letra
      newWordArray[attempt][input.length] = { value: key };

      // Actualiza el estado de wordArray y luego de input
      setWordArray(newWordArray);
      setInput(input + key);
    }
  }

  function handleInput(event) {
    const value = event.target.value.toUpperCase();

    // Solo permite ingresar hasta el número de letras de la palabra objetivo
    if (value.length <= word.length) {
      setInput(value);

      // Actualiza la fila actual en wordArray con las letras ingresadas
      const newWordArray = [...wordArray];
      newWordArray[attempt] = value.split("").map((letter) => ({
        value: letter,
      }));

      setWordArray(newWordArray);
    }
  }

  function handleForm(event) {
    if (event) event.preventDefault();

    if (input.length === word.length) {
      const newWordArray = [...wordArray];

      // Validación de letras y actualización directa en wordArray
      for (let i = 0; i < word.length; i++) {
        if (word[i] === input[i]) {
          newWordArray[attempt][i] = {
            value: input[i],
            correct: true,
            present: true,
          };
        } else if (word.includes(input[i])) {
          newWordArray[attempt][i] = {
            value: input[i],
            correct: false,
            present: true,
          };
        } else {
          newWordArray[attempt][i] = {
            value: input[i],
            correct: false,
            present: false,
          };
        }
      }

      // Actualizar el arreglo de palabras y los intentos
      setWordArray(newWordArray);
      setAttempt(attempt + 1);

      // Verificar si ganó
      if (input === word) {
        confetti({ particleCount: 100 });
        setWinner(true);
      }

      setInput(""); // Reiniciar input
    } else {
      alert("La palabra debe tener 5 letras");
    }
  }

  function handleIntentar() {
    setAttempt(0);
    setWordArray(Array(5).fill(Array(5).fill(null)));
    setWinner(null);
    setWord(getRandomWord());
  }

  return (
    <div className="contenedor">
      <h1>Wordle</h1>

      <hr />

      <div className="board-letters">
        {wordArray.map((row, rowIndex) => (
          <div className="container-squares" key={rowIndex}>
            {row.map((value, index) => (
              <Square
                key={index}
                value={value?.value}
                present={value?.present}
                correct={value?.correct}
              />
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Ingrese una palabra"
          onChange={handleInput}
          value={input}
          maxLength={word.length}
        />
        <input type="submit" value="Adivinar" />
      </form>

      {winner == !null && (
        <div className="mensaje-winner">
          <p>Felicidades! Has adivinado la palabra 🎊🎊</p>
          <button onClick={handleIntentar}>Jugar nuevamente</button>
        </div>
      )}

      {attempt === 5 && !winner && (
        <div className="mensaje-perdedor">
          <p>Has perdido!</p>
          <hr />
          <button onClick={handleIntentar}>Intentar nuevamente</button>
        </div>
      )}

      <KeyBoard onKeyPress={handleKeyPress}></KeyBoard>
    </div>
  );
}
