import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Favoritos from "./pages/Favoritos";
import Error from "./pages/Error";

// import do Header
import Header from "./components/Header";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>

        {/* Rota para a página inicial */}
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
        <Route path="/favoritos" element={<Favoritos />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;