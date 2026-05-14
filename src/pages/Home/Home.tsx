import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  ArrowRight,
  Star,
  HeartPulse,
  Activity,
  Shield,
  Users,
  Heart,
  Droplet } from
'lucide-react';
import { PageMeta } from '../../components/PageMeta';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { useApi } from '../../hooks/useApi';
import { useIntersection } from '../../hooks/useIntersection';
import { api } from '../../api/api';
import './Home.css';
// Helper to map icon string to component
const getIcon = (iconName: string, size = 32) => {
  switch (iconName) {
    case 'Bandage':
      return <HeartPulse size={size} />;
    case 'Activity':
      return <Activity size={size} />;
    case 'Shield':
      return <Shield size={size} />;
    case 'Users':
      return <Users size={size} />;
    case 'Heart':
      return <Heart size={size} />;
    case 'Droplet':
      return <Droplet size={size} />;
    default:
      return <HeartPulse size={size} />;
  }
};
// Helper for initials
const getInitials = (name: string) => {
  return name.
  split(' ').
  map((n) => n[0]).
  join('').
  substring(0, 2).
  toUpperCase();
};
export function Home() {
  const { data: settings, loading: settingsLoading } = useApi(api.getSettings);
  const { data: services, loading: servicesLoading } = useApi(api.getServices);
  const { data: about, loading: aboutLoading } = useApi(api.getAbout);
  const { data: staff, loading: staffLoading } = useApi(api.getStaff);
  const { data: testimonials, loading: testimonialsLoading } = useApi(
    api.getTestimonials
  );
  const { elementRef: servicesRef, isVisible: servicesVisible } =
  useIntersection();
  const { elementRef: aboutRef, isVisible: aboutVisible } = useIntersection();
  const { elementRef: teamRef, isVisible: teamVisible } = useIntersection();
  return (
    <>
      <PageMeta
        title="Home | Havenique Home Based Nursing Care"
        description="Professional home-based nursing care in Lusaka, Zambia. Care in the comfort of your home." />
      

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1>Professional Nursing Care, Right at Home</h1>
            {settingsLoading ?
            <SkeletonLoader height="24px" width="80%" className="mb-8" /> :

            <p>{settings?.slogan || 'Care in the comfort of your home'}</p>
            }
            <div className="hero-ctas">
              <Link to="/services" className="btn btn-primary">
                Our Services
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Book a Visit
              </Link>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="placeholder-img">
              <HeartPulse size={80} opacity={0.8} />
            </div>
          </div>
        </div>

        {/* Diagonal SVG Divider */}
        <svg
          className="hero-svg-divider"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none">
          
          <path d="M0 120L1440 0V120H0Z" fill="#142D60" />
        </svg>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="container trust-container">
          <div className="trust-item">
            <CheckCircle size={24} />
            <span>Registered Nurses</span>
          </div>
          <div className="trust-item">
            <CheckCircle size={24} />
            <span>Lusaka-Wide Coverage</span>
          </div>
          <div className="trust-item">
            <CheckCircle size={24} />
            <span>24/7 Emergency Support</span>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section
        className="section section-bg"
        ref={servicesRef as React.RefObject<HTMLDivElement>}>
        
        <div
          className={`container fade-in-section ${servicesVisible ? 'is-visible' : ''}`}>
          
          <div className="section-header">
            <h2>Our Services</h2>
            <p>
              Comprehensive nursing care tailored to your specific needs,
              delivered in the comfort of your home.
            </p>
          </div>

          <div className="services-grid">
            {servicesLoading ?
            Array(6).
            fill(0).
            map((_, i) =>
            <div key={i} className="card service-card">
                      <SkeletonLoader
                width="80px"
                height="80px"
                borderRadius="50%"
                className="mx-auto mb-4" />
              
                      <SkeletonLoader
                height="24px"
                width="60%"
                className="mx-auto mb-2" />
              
                      <SkeletonLoader height="60px" width="100%" />
                    </div>
            ) :
            services?.slice(0, 6).map((service) =>
            <div key={service.id} className="card service-card">
                    <div className="service-icon-wrap">
                      {getIcon(service.icon)}
                    </div>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
            )}
          </div>

          <div className="center-cta">
            <Link to="/services" className="btn btn-secondary">
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section
        className="section section-light"
        ref={aboutRef as React.RefObject<HTMLDivElement>}>
        
        <div
          className={`container about-snippet-grid fade-in-section ${aboutVisible ? 'is-visible' : ''}`}>
          
          <div
            className="placeholder-img"
            style={{
              minHeight: '400px'
            }}>
            
            <Users size={80} opacity={0.8} />
          </div>
          <div className="about-snippet-content">
            <h2>Who We Are</h2>
            {aboutLoading ?
            <>
                <SkeletonLoader height="20px" width="100%" className="mb-2" />
                <SkeletonLoader height="20px" width="100%" className="mb-2" />
                <SkeletonLoader height="20px" width="80%" className="mb-6" />
              </> :

            <p>{about?.story.substring(0, 200)}...</p>
            }
            <Link to="/about" className="btn btn-primary">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Team Snippet */}
      <section
        className="section section-bg"
        ref={teamRef as React.RefObject<HTMLDivElement>}>
        
        <div
          className={`container fade-in-section ${teamVisible ? 'is-visible' : ''}`}>
          
          <div className="section-header">
            <h2>Meet Our Leadership</h2>
            <p>
              Led by experienced healthcare professionals dedicated to
              excellence.
            </p>
          </div>

          <div
            className="team-grid"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap'
            }}>
            
            {staffLoading ?
            Array(2).
            fill(0).
            map((_, i) =>
            <div
              key={i}
              className="card team-card"
              style={{
                width: '300px'
              }}>
              
                      <SkeletonLoader
                width="120px"
                height="120px"
                borderRadius="50%"
                className="mx-auto mb-4" />
              
                      <SkeletonLoader
                height="24px"
                width="80%"
                className="mx-auto mb-2" />
              
                      <SkeletonLoader
                height="20px"
                width="60%"
                className="mx-auto" />
              
                    </div>
            ) :
            staff?.slice(0, 3).map((member) =>
            <div
              key={member.id}
              className="card team-card"
              style={{
                width: '300px'
              }}>
              
                    <div className="team-avatar">
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        getInitials(member.name)
                      )}
                    </div>
                    <h3>{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                  </div>
            )}
          </div>

          <div
            className="center-cta"
            style={{
              marginTop: '40px'
            }}>
            
            <Link to="/team" className="btn btn-secondary">
              Meet The Full Team
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Strip */}
      <section className="testimonials-strip">
        <div className="container">
          <div className="section-header">
            <h2>What Our Clients Say</h2>
          </div>

          <div className="testimonials-grid">
            {testimonialsLoading ?
            Array(3).
            fill(0).
            map((_, i) =>
            <div key={i} className="testimonial-card">
                      <SkeletonLoader
                height="20px"
                width="100px"
                className="mb-4" />
              
                      <SkeletonLoader
                height="80px"
                width="100%"
                className="mb-4" />
              
                      <SkeletonLoader height="40px" width="150px" />
                    </div>
            ) :
            testimonials?.slice(0, 3).map((testimonial) =>
            <div key={testimonial.id} className="testimonial-card">
                    <div className="stars">
                      {Array(testimonial.rating).
                fill(0).
                map((_, i) =>
                <Star key={i} size={18} fill="currentColor" />
                )}
                    </div>
                    <p className="testimonial-quote">"{testimonial.quote}"</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        {getInitials(testimonial.name)}
                      </div>
                      <div className="author-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to book a home visit?</h2>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            style={{
              padding: '16px 32px',
              fontSize: '18px'
            }}>
            
            Contact Us Today
          </Link>
        </div>
      </section>
    </>);

}