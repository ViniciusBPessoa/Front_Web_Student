import { NavLink } from "react-router-dom";
import { FaFilm, FaHeart } from "react-icons/fa";
import "./header.css";

function Header() {
    return (
        <header className="header-container">
            <div className="header-content">
                <NavLink className="logo" to="/">
                    <FaFilm className="logo-icon" />
                    <span className="logo-sad">Sad</span>
                    <span className="logo-flix">Flix</span>
                </NavLink>

                <nav className="nav-links">
                    <NavLink
                        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                        to="/"
                        end
                    >
                        Início
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => `nav-link nav-link-heart${isActive ? ' active' : ''}`}
                        to="/favoritos"
                    >
                        <FaHeart className="nav-icon" />
                        <span>Meus Filmes</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;
