import React, { useState } from "react";
import './Calculadora.css'

export default function Calculadora() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = (operacao) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResultado("Valores inválidos");
      return;
    }

    switch (operacao) {
      case '+': setResultado(a + b); break;
      case '-': setResultado(a - b); break;
      case '*': setResultado(a * b); break;
      case '/':
        if (b === 0) setResultado("Divisão por zero");
        else setResultado(a / b);
        break;
      default: setResultado(null);
    }
  };

  return (
    <div className="quadrado">
      <h3>Calculadora</h3>
      <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="Número 1" />
      <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="Número 2" />
      <div className="botoes">
        <button onClick={() => calcular('+')}>+</button>
        <button onClick={() => calcular('-')}>−</button>
        <button onClick={() => calcular('*')}>×</button>
        <button onClick={() => calcular('/')}>÷</button>
      </div>
      <p>Resultado: {resultado}</p>
    </div>
  );
}
