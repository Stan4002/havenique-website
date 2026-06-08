import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Shield,
  Award,
  CheckCircle,
  Home as HomeIcon,
  UserCheck,
  Clock,
  MapPin } from
'lucide-react';
import { PageMeta } from '../../components/PageMeta';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { useApi } from '../../hooks/useApi';
import { useIntersection } from '../../hooks/useIntersection';
import { api } from '../../api/api';
import './About.css';
export function About() {
  const [storyImgFailed, setStoryImgFailed] = React.useState(false);
  const { data: about, loading } = useApi(api.getAbout);
  const { elementRef: storyRef, isVisible: storyVisible } = useIntersection();
  const { elementRef: valuesRef, isVisible: valuesVisible } = useIntersection();
  const { elementRef: whyRef, isVisible: whyVisible } = useIntersection();
  return (
    <>
      <PageMeta
        title="About Us | Havenique Home Based Nursing Care"
        description="Learn about Havenique's mission to provide exceptional home-based nursing care in Lusaka." />
      

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; About Us
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        className="section section-light"
        ref={storyRef as React.RefObject<HTMLDivElement>}>
        
        <div
          className={`container story-grid fade-in-section ${storyVisible ? 'is-visible' : ''}`}>
          
          {storyImgFailed ? (
            <div
              className="placeholder-img"
              style={{
                minHeight: '500px'
              }}>
              <Heart size={80} opacity={0.8} />
            </div>
          ) : (
            <img
              src="https://zviwalgwskidehamfkcz.supabase.co/storage/v1/object/public/havenique-media/WhatsApp%20Image%202026-05-09%20at%2004.16.18.jpeg"
              alt="Our story"
              onError={() => setStoryImgFailed(true)}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                minHeight: '500px',
                borderRadius: 'var(--radius-md)'
              }}
            />
          )}
          <div className="story-content">
            <h2>Our Story</h2>
            {loading ?
            <>
                <SkeletonLoader height="20px" width="100%" className="mb-4" />
                <SkeletonLoader height="20px" width="100%" className="mb-4" />
                <SkeletonLoader height="20px" width="90%" className="mb-4" />
                <SkeletonLoader height="20px" width="95%" className="mb-4" />
                <SkeletonLoader height="20px" width="80%" />
              </> :

            <p>{about?.story}</p>
            }
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section
        className="section section-bg"
        ref={valuesRef as React.RefObject<HTMLDivElement>}>
        
        <div
          className={`container fade-in-section ${valuesVisible ? 'is-visible' : ''}`}>
          
          <div className="mission-section">
            <h2
              style={{
                marginBottom: '20px'
              }}>
              
              Our Mission
            </h2>
            {loading ?
            <SkeletonLoader height="30px" width="100%" className="mx-auto" /> :

            <p className="mission-text">"{about?.mission}"</p>
            }
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Heart size={48} />
              </div>
              <h3>Compassion</h3>
              <p>
                We treat every patient with the utmost empathy, kindness, and
                respect, understanding that emotional support is crucial to
                healing.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Shield size={48} />
              </div>
              <h3>Confidentiality</h3>
              <p>
                We maintain strict privacy standards, ensuring all patient
                medical records and personal information remain completely
                secure.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Award size={48} />
              </div>
              <h3>Professionalism</h3>
              <p>
                Our team consists only of highly trained, registered nurses
                committed to delivering clinical excellence in every visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="section section-light"
        ref={whyRef as React.RefObject<HTMLDivElement>}>
        
        <div
          className={`container fade-in-section ${whyVisible ? 'is-visible' : ''}`}>
          
          <div className="section-header">
            <h2>Why Choose Havenique?</h2>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <CheckCircle size={36} />
              </div>
              <h4>Registered Nurses</h4>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <HomeIcon size={36} />
              </div>
              <h4>Home Comfort</h4>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <UserCheck size={36} />
              </div>
              <h4>Personalised Care</h4>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <Clock size={36} />
              </div>
              <h4>24/7 Availability</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section section-bg">
        <div className="container service-area-grid">
          <div>
            <h2
              style={{
                fontSize: '36px',
                marginBottom: '24px'
              }}>
              
              Our Service Area
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: 'var(--text-light)',
                marginBottom: '24px'
              }}>
              
              We are proud to serve the community across:
            </p>
            {loading ?
            <SkeletonLoader height="30px" width="200px" /> :

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'var(--blue)'
              }}>
              
                <MapPin size={28} color="var(--gold)" />
                {about?.service_areas}
              </div>
            }
          </div>
          <div className="map-placeholder">
            <MapPin
              size={48}
              color="#94A3B8"
              style={{
                marginBottom: '16px'
              }} />
            
            <p>{/* PLACEHOLDER: Add Google Maps embed src */}</p>
            <p>Google Maps Integration Pending</p>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="cta-banner">
        <div className="container">
          <h2>Experience the Havenique difference.</h2>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg"
            style={{
              padding: '16px 32px',
              fontSize: '18px'
            }}>
            
            Get in Touch
          </Link>
        </div>
      </section>
    </>);

}