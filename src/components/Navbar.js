import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Store', path: '/store' },
    { label: 'About Mama Africa', path: '/about' },
    // { label: 'Stories', path: '/stories' }, // hidden for now
    { label: 'Culture', path: '/culture' },
  ];
  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate('/');
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <img src="/images/logo.png" alt="Mama Africa" style={{ height: 68, width: 68, objectFit: 'contain', borderRadius: '50%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span className="nav-logo-text">Mama Africa Official</span>
            <span className="nav-tagline">
              Ghana · Heritage, culture & keepsakes
            </span>
          </div>
        </Link>

        <div className="nav-desktop-links">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="nav-user-area">
              <Link to="/account" className="nav-user-name" style={{ textDecoration: 'none' }}>{user.name}</Link>
              <button onClick={handleLogout} className="nav-logout-btn">Sign Out</button>
            </div>
          ) : (
            <Link to="/auth" className={`nav-link ${isActive('/auth') ? 'nav-link-active' : ''}`}>
              Sign In
            </Link>
          )}
        </div>

        <div className="nav-mobile-right">
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="nav-mobile-menu">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'mobile-nav-link-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/account" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                My Account — {user.name}
              </Link>
              <button onClick={handleLogout} className="mobile-logout-btn">Sign Out</button>
            </>
          ) : (
            <Link to="/auth" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </>
  );
}
