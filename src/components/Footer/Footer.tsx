import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Logo } from '../Logo';
import { api } from '../../api/api';
import './Footer.css';
export function Footer() {
  const [settings, setSettings] = useState({
    business_name: 'Havenique Home Based Nursing Care',
    slogan: 'Care in the comfort of your home',
    phone: '',
    phone2: '',
    email: '',
    address: '',
    whatsapp: '',
    year: new Date().getFullYear()
  } as any);
  useEffect(() => {
    api.getSettings().then((data) => {
      if (data) {
        setSettings((prev) => ({
          ...prev,
          ...data
        }));
      }
    });
  }, []);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <Logo width={52} height={52} />
              <span className="footer-brand-text">
                {settings.business_name}
              </span>
            </div>
            <p className="footer-slogan">{settings.slogan}</p>
            <p className="footer-desc">
              Providing professional, compassionate, and personalized nursing
              care directly to your home in Lusaka.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Our Services</Link>
              </li>
              <li>
                <Link to="/team">Our Team</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/testimonials">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact">
              {settings.address &&
              <div className="contact-item">
                  <MapPin size={18} />
                  <span>{settings.address}</span>
                </div>
              }
              {settings.phone &&
              <div className="contact-item">
                  <Phone size={18} />
                  <span>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`}>
                      {settings.phone}
                    </a>
                    {settings.phone2 &&
                  <>
                        <br />
                        <a href={`tel:${settings.phone2.replace(/\s+/g, '')}`}>
                          {settings.phone2}
                        </a>
                      </>
                  }
                  </span>
                </div>
              }
              {settings.email &&
              <div className="contact-item">
                  <Mail size={18} />
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </div>
              }
              {settings.whatsapp &&
              <div className="contact-item">
                  <MessageCircle size={18} />
                  <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  
                    WhatsApp Us
                  </a>
                </div>
              }
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {settings.year} {settings.business_name}. All rights
            reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>);

}