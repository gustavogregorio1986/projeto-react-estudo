import React, { useState, useEffect } from "react";

export default function AvioesVoandoAgora() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [origens, setOrigens] = useState({}); // objeto para guardar origem de cada avião
  const [loadingOrigem, setLoadingOrigem] = useState({}); // loading por avião

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://opensky-network.org/api/states/all");
        if (!response.ok) throw new Error("Erro na API");

        const data = await response.json();
        setStates(data.states || []);
        setLoading(false);
      } catch (error) {
        setErro(error.message);
        setLoading(false);
      }
    };

    fetchStates();

    const interval = setInterval(fetchStates, 15000);
    return () => clearInterval(interval);
  }, []);

  async function buscarAeroportoOrigem(icao24) {
    setLoadingOrigem((prev) => ({ ...prev, [icao24]: true }));

    const agora = Math.floor(Date.now() / 1000);
    const umaHoraAtras = agora - 3600;

    try {
      const response = await fetch(
        `https://opensky-network.org/api/flights/aircraft?icao24=${icao24}&begin=${umaHoraAtras}&end=${agora}`,
        {
          headers: {
            Authorization: 'Basic ' + btoa('usuario:senha') // troque aqui suas credenciais OpenSky
          }
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar voos');
      }

      const voos = await response.json();

      const origem = voos.length > 0 ? (voos[0].estDepartureAirport || "Origem não informada") : "Origem não disponível";
      setOrigens((prev) => ({ ...prev, [icao24]: origem }));
    } catch (error) {
      setOrigens((prev) => ({ ...prev, [icao24]: "Erro ao buscar origem" }));
    } finally {
      setLoadingOrigem((prev) => ({ ...prev, [icao24]: false }));
    }
  }

  if (loading) return <p>Carregando aviões...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
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
            <th>Aeroporto de Origem</th>
          </tr>
        </thead>
        <tbody>
          {states.slice(0, 20).map((state, i) => {
            const icao24 = state[0];
            return (
              <tr key={i}>
                <td>{icao24}</td>
                <td>{state[1]?.trim() || "N/A"}</td>
                <td>{state[2]}</td>
                <td>{state[7] !== null ? state[7].toFixed(0) : "N/A"}</td>
                <td>{state[9] !== null ? state[9].toFixed(1) : "N/A"}</td>
                <td>{state[6] !== null ? state[6].toFixed(3) : "N/A"}</td>
                <td>{state[5] !== null ? state[5].toFixed(3) : "N/A"}</td>
                <td>
                  {origens[icao24] ? (
                    origens[icao24]
                  ) : (
                    <button
                      onClick={() => buscarAeroportoOrigem(icao24)}
                      disabled={loadingOrigem[icao24]}
                    >
                      {loadingOrigem[icao24] ? "Carregando..." : "Mostrar Origem"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Mostrando os primeiros 20 aviões...</p>
    </div>
  );
}
