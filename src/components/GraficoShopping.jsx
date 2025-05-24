// src/components/GraficoShopping.js
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const GraficoShopping = () => {
  const [dados, setDados] = useState([]);

  // Simular entrada de pessoas a cada 2 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setDados(prev => {
        const novaEntrada = {
          tempo: new Date().toLocaleTimeString(),
          pessoas: Math.floor(Math.random() * 100) + 1
        };
        const novosDados = [...prev, novaEntrada];
        return novosDados.slice(-10); // manter apenas os 10 últimos
      });
    }, 2000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2 style={{ textAlign: 'center' }}>Pessoas no Shopping (Tempo Real)</h2>
      <ResponsiveContainer>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tempo" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pessoas" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoShopping;
