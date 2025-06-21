import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import TestPage from "./pages/TestPage";
import NotFoundPage from "./pages/NotFoundPage";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./RoutesApp.css";

function RoutesApp() {
  useEffect(() => {
    document.title = "Vinicius Pessoa";
  }, []);

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