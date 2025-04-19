import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";

function RoutesApp() {
    return (
      <BrowserRouter>
        <Header/>
        <Routes>
  
          {/* Rota para a página inicial */}
          <Route path="/" element={<Home />} />

  
        </Routes>
      </BrowserRouter>
    );
  }
 // <Route path="*" element={<Error />} />

  export default RoutesApp;