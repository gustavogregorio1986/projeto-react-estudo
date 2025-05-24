import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contador from "./components/Contador";
import Calculadora from "./components/Calculadora";
import Verificacao from "./components/Verificacao";
import './App.css';
import Tabuada from "./components/Tabuada";
import ContadorAteNumero from "./components/ContadorAteNumero";
import GraficoShopping from "./components/GraficoShopping";
import AviõesVoandoAgora from "./components/AviõesVoandoAgora";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Contador</Link> 
          <Link to="/calculadora">Calculadora</Link>
          <Link to="/verificacao">Verificação</Link>
          <Link to="/tabuada">Tabuada</Link>
          <Link to="/contadorAteNumero">Contador ate numero</Link>
          <Link to="/graficoShopping">Grafico Shopping</Link>
          <Link to="/aviõesVoandoAgora">Aviões voando</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Contador />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/verificacao" element={<Verificacao />} />
          <Route path="/Tabuada" element={<Tabuada />} />
          <Route path="/ContadorAteNumero" element={<ContadorAteNumero />} />
          <Route path="/GraficoShopping" element={<GraficoShopping />} />
          <Route path="/AviõesVoandoAgora" element={<AviõesVoandoAgora />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
