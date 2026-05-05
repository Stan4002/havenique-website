import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../Logo';
import { api } from '../../api/api';
import './Navbar.css';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessName, setBusinessName] = useState(
    'Havenique Home Based Nursing Care'
  );
  const location = useLocation();
  useEffect(() => {
    api.getSettings().then((data) => {
      if (data && data.business_name) {
        setBusinessName(data.business_name);
      }
    });
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  const navLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Services',
    path: '/services'
  },
  {
    name: 'Team',
    path: '/team'
  },
  {
    name: 'Pricing',
    path: '/pricing'
  },
  {
    name: 'Blog',
    path: '/blog'
  },
  {
    name: 'Contact',
    path: '/contact'
  }];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <Link to="/" className="navbar-brand">
            <Logo width={60} height={60} />
            <span className="navbar-brand-text">{businessName}</span>
          </Link>

          <div className="navbar-nav">
            {navLinks.map((link) =>
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
              }>
              
                {link.name}
              </NavLink>
            )}
            <Link to="/contact" className="btn btn-primary">
              Book a Visit
            </Link>
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu">
            
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) =>
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
          }>
          
            {link.name}
          </NavLink>
        )}
        <Link to="/contact" className="btn btn-primary">
          Book a Visit
        </Link>
      </div>
    </>);

}