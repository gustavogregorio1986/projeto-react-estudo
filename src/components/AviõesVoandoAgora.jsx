import React, { useState, useEffect } from "react";

export default function AviõesVoandoAgora() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://opensky-network.org/api/states/all");
        if (!response.ok) throw new Error("Erro na API");

        const data = await response.json();
        // data.states é um array com os aviões (cada estado tem vários dados)
        setStates(data.states || []);
        setLoading(false);
      } catch (error) {
        setErro(error.message);
        setLoading(false);
      }
    };

    fetchStates();

    // Atualizar a cada 15 segundos (OpenSky sugere não muito rápido)
    const interval = setInterval(fetchStates, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Carregando aviões...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>Aviões voando agora (OpenSky API)</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>ICAO24</th>
            <th>Callsign</th>
            <th>País</th>
            <th>Altitude (m)</th>
            <th>Velocidade (m/s)</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {states.slice(0, 20).map((state, i) => (
            <tr key={i}>
              <td>{state[0]}</td>
              <td>{state[1]?.trim() || "N/A"}</td>
              <td>{state[2]}</td>
              <td>{state[7] !== null ? state[7].toFixed(0) : "N/A"}</td>
              <td>{state[9] !== null ? state[9].toFixed(1) : "N/A"}</td>
              <td>{state[6] !== null ? state[6].toFixed(3) : "N/A"}</td>
              <td>{state[5] !== null ? state[5].toFixed(3) : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Mostrando os primeiros 20 aviões...</p>
    </div>
  );
}