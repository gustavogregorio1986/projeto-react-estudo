import React, { useState } from "react";
import './Contador.css'

export default function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div className="quadrado">
      <h3>Crescimento no desenvolvimento</h3>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Aumentar</button>
      <button onClick={() => setCount(count - 1)}>Diminuir</button>
    </div>
  );
}
