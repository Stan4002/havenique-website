import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Activity,
  Shield,
  Users,
  Heart,
  Droplet,
  BookOpen,
  Smile,
  UserCheck,
  Home } from
'lucide-react';
import { PageMeta } from '../../components/PageMeta';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { useApi } from '../../hooks/useApi';
import { api } from '../../api/api';
import './Services.css';
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
    case 'BookOpen':
      return <BookOpen size={size} />;
    case 'Smile':
      return <Smile size={size} />;
    case 'UserCheck':
      return <UserCheck size={size} />;
    case 'Home':
      return <Home size={size} />;
    default:
      return <HeartPulse size={size} />;
  }
};
export function Services() {
  const { data: services, loading } = useApi(api.getServices);
  return (
    <>
      <PageMeta
        title="Our Services | Havenique Home Based Nursing Care"
        description="Comprehensive home-based nursing services in Lusaka, including wound care, post-hospital care, and more." />
      

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; Services
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <p className="services-intro">
            We offer a wide range of professional nursing services designed to
            meet the unique needs of every patient. Our goal is to provide
            clinical excellence while ensuring comfort and dignity in your own
            home.
          </p>

          <div className="services-page-grid">
            {loading ?
            Array(9).
            fill(0).
            map((_, i) =>
            <div key={i} className="service-page-card">
                      <SkeletonLoader
                width="70px"
                height="70px"
                borderRadius="4px"
                className="mb-6" />
              
                      <SkeletonLoader
                height="28px"
                width="80%"
                className="mb-4" />
              
                      <SkeletonLoader
                height="20px"
                width="100%"
                className="mb-2" />
              
                      <SkeletonLoader height="20px" width="90%" />
                    </div>
            ) :
            services?.map((service) =>
            <div key={service.id} className="service-page-card">
                    <div className="service-page-icon">
                      {getIcon(service.icon)}
                    </div>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="cta-banner">
        <div className="container">
          <h2>Not sure which service you need?</h2>
          <p
            style={{
              fontSize: '18px',
              marginBottom: '30px',
              maxWidth: '600px',
              margin: '0 auto 30px'
            }}>
            
            Contact us for a consultation. We'll assess your needs and recommend
            the best care plan.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            style={{
              padding: '16px 32px',
              fontSize: '18px'
            }}>
            
            Contact Us
          </Link>
        </div>
      </section>
    </>);

}