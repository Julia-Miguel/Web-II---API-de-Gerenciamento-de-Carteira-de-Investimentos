// src/components/layout/Navbar.tsx
import { NavLink } from "react-router-dom";
import './Navbar.css';
import { FaShoppingCart, FaCalendarAlt } from 'react-icons/fa';
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    Carteira de Investimentos
                </NavLink>
                
                <ul className="nav-menu">
                    <li className="nav-item">
                        <NavLink 
                            to="/investments" 
                            className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
                        >
                            <FaCalendarAlt />
                            <span>Meus Ativos</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            to="/summary" 
                            className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
                        >
                            <FaShoppingCart />
                            <span>Resumo</span>
                        </NavLink>
                    </li>
                </ul>
                
                <div className="theme-toggle-wrapper">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;