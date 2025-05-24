import React, { useState } from "react";

export default function Verificacao() {
  const [numVerificar, setNumVerificar] = useState('');
  const [resultadoParOuImpar, setResultadoParOuImpar] = useState('');
  const [resultadoSinal, setResultadoSinal] = useState('');

  const verificarParOuImpar = () => {
    const numero = parseInt(numVerificar);
    if (isNaN(numero)) {
      setResultadoParOuImpar("Digite um número válido.");
      return;
    }
    setResultadoParOuImpar(`${numero} é ${numero % 2 === 0 ? "PAR" : "ÍMPAR"}`);
  };

  const verificarSinal = () => {
    const numero = parseInt(numVerificar);
    if (isNaN(numero)) {
      setResultadoSinal("Digite um número válido.");
      return;
    }
    if (numero > 0) setResultadoSinal(`${numero} é POSITIVO`);
    else if (numero < 0) setResultadoSinal(`${numero} é NEGATIVO`);
    else setResultadoSinal(`${numero} é ZERO`);
  };

  return (
    <div className="quadrado">
      <h3>Verificação de Número</h3>
      <input type="number" value={numVerificar} onChange={(e) => setNumVerificar(e.target.value)} placeholder="Digite um número" />
      <div className="botoes">
        <button onClick={verificarParOuImpar}>Par ou Ímpar</button>
        <button onClick={verificarSinal}>Positivo ou Negativo</button>
      </div>
      <p>{resultadoParOuImpar}</p>
      <p>{resultadoSinal}</p>
    </div>
  );
}
