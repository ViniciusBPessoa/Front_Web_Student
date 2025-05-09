import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TestPage from "./pages/TestPage";
import NotFoundPage from "./pages/NotFoundPage";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./RoutesApp.css"; // Importe o CSS

function RoutesApp() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default RoutesApp;