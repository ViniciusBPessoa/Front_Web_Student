import { Link } from "react-router-dom";
import { FaFilm, FaHeart } from "react-icons/fa";
import "./header.css";

function Header() {
    return (
        <header className="header-container">
            <div className="header-content">
                <Link className="logo" to="/">
                    <FaFilm className="logo-icon" />
                    <span>Sad</span>Flix
                </Link>
                
                <nav className="nav-links">
                    <Link className="nav-link" to="/">Início</Link>
                    <Link className="nav-link" to="/favoritos">
                        <FaHeart className="nav-icon" />
                        Meus Filmes
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;