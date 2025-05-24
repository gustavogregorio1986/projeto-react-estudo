async function buscarAeroportoOrigem(icao24) {
  const agora = Math.floor(Date.now() / 1000);
  const umaHoraAtras = agora - 3600; // 1 hora atrás

  try {
    const response = await fetch(
      `https://opensky-network.org/api/flights/aircraft?icao24=${icao24}&begin=${umaHoraAtras}&end=${agora}`,
      {
        headers: {
          Authorization: 'Basic ' + btoa('usuario:senha') // substitua com suas credenciais
        }
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar voos');
    }

    const voos = await response.json();
    if (voos.length === 0) return "Origem não disponível";

    return voos[0].estDepartureAirport || "Origem não informada";
  } catch (error) {
    return "Erro ao buscar origem";
  }
}
