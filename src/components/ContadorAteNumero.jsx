import React, { useState } from 'react';

export default function ContadorAteNumero() {
  const [numero, setNumero] = useState('');
  const [lista, setLista] = useState([]);

  const gerarLista = () => {
    const n = parseInt(numero);
    if (isNaN(n) || n < 1) {
      setLista(["Digite um número válido maior que 0."]);
      return;
    }

    const resultado = [];
    for (let i = 1; i <= n; i++) {
      resultado.push(i);
    }
    setLista(resultado);
  };

  return (
    <div style={{ maxWidth: 300, margin: "40px auto", textAlign: "center" }}>
      <h3>Contar até o número digitado</h3>

      <input
        type="number"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Digite um número"
        style={{ width: "100%", padding: 10, fontSize: 16 }}
      />

      <button
        onClick={gerarLista}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 10,
          fontSize: 16,
          backgroundColor: "#4A90E2",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Gerar Contagem
      </button>

      <ul style={{ marginTop: 20, fontSize: 18 }}>
        {lista.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}