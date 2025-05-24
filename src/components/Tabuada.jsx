import React, { useState } from "react";
import './Tabuada.css';

export default function Tabuada() {
  const [numero, setNumero] = useState('');
  const [tabuada, setTabuada] = useState([]);

  const gerarTabuada = () => {
    const n = parseInt(numero);
    if (isNaN(n)) {
      setTabuada([]);
      return;
    }

    const resultados = [];
    for (let i = 1; i <= 10; i++) {
      resultados.push(`${n} x ${i} = ${n * i}`);
    }
    setTabuada(resultados);
  };

  return (
    <div style={{ maxWidth: 300, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>Gerador de Tabuada</h3>
      <input
        type="number"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Digite um número"
        style={{ width: "100%", padding: 8, marginBottom: 10, fontSize: 16 }}
      />
      <button onClick={gerarTabuada} style={{ width: "100%", padding: 10, fontSize: 16, cursor: "pointer" }}>
        Gerar Tabuada
      </button>

      <ul style={{ marginTop: 20 }}>
        {tabuada.map((item, index) => (
          <li key={index} style={{ marginBottom: 5, fontSize: 18 }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}