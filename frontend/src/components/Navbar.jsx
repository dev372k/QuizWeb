import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { navbarStyles } from '../assets/dummyStyle';
import { Award, LogIn, LogOut, Menu, X } from 'lucide-react';

const Navbar = ({ logoSrc }) => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Logout function
    const handleLogout = () => {
        try {
            localStorage.removeItem('authToken');
            localStorage.clear();
        } catch {
            // ignore errors
        }

        window.dispatchEvent(
            new CustomEvent('authChanged', { detail: { user: null } })
        );

        setMenuOpen(false);
        setLoggedIn(false);

        try {
            navigate('/login');
        } catch {
            window.location.href = '/login';
        }
    };

    return (
        <nav className={navbarStyles.nav}>
            {/* Decorative background */}
            <div
                style={{ backgroundImage: navbarStyles.decorativePatternBackground }}
                className={navbarStyles.decorativePattern}
            ></div>
            <div className={navbarStyles.bubble1}></div>
            <div className={navbarStyles.bubble2}></div>
            <div className={navbarStyles.bubble3}></div>

            {/* Navbar main container */}
            <div className={navbarStyles.container + " flex justify-between items-center w-full px-4 py-2"}>
                
                {/* Logo left */}
                <div className={navbarStyles.logoContainer}>
                    <Link to="/" className={navbarStyles.loginButton}>
                        <div className={navbarStyles.logoInner}>
                            <img
                                src={logoSrc || "https://yt3.googleusercontent.com/eD5QJD-9uS--ekQcA-kDTCu1ZO4d7d7BTKLIVH-EySZtDVw3JZcc-bHHDOMvxys92F7rD8Kgfg=s900-c-k-c0x00ffffff-no-rj"}
                                alt="QuizMaster logo"
                                className={navbarStyles.logoImage}
                            />
                        </div>
                    </Link>
                </div>

                {/* Title center */}
                <div className={navbarStyles.titleContainer + " -mt-19"}>
                    <div className={navbarStyles.titleBackground}>
                        <h1 className={navbarStyles.titleText}>Quiz Application</h1>
                    </div>
                </div>

                {/* Buttons + toggle right */}
                <div className="flex items-center space-x-3">
                    {/* My Result button */}
                    <NavLink to='/result' className={navbarStyles.resultsButton}>
                        <Award className={navbarStyles.buttonIcon} />
                        My Result
                    </NavLink>

                    {/* Login / Logout button */}
                    {loggedIn ? (
                        <button onClick={handleLogout} className={navbarStyles.logoButton}>
                            <LogOut className={navbarStyles.buttonIcon} />
                            Logout
                        </button>
                    ) : (
                        <NavLink to='/login' className={navbarStyles.loginButton}>
                            <LogIn className={navbarStyles.buttonIcon} />
                            Login
                        </NavLink>
                    )}

                    {/* Toggle button */}
                    <button
                        onClick={() => setMenuOpen((s) => !s)}
                        className={navbarStyles.menuToggleButton}
                    >
                        {menuOpen ? <X className={navbarStyles.menuIcon} /> : <Menu className={navbarStyles.menuIcon} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
