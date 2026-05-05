import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { PageMeta } from '../../components/PageMeta';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { useApi } from '../../hooks/useApi';
import { api } from '../../api/api';
import './Testimonials.css';
// Helper for initials
const getInitials = (name: string) => {
  return name.
  split(' ').
  map((n) => n[0]).
  join('').
  substring(0, 2).
  toUpperCase();
};
export function Testimonials() {
  const { data: testimonials, loading } = useApi(api.getTestimonials);
  return (
    <>
      <PageMeta
        title="Testimonials | Havenique Home Based Nursing Care"
        description="Read what our clients have to say about our home-based nursing care in Lusaka." />
      

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Client Testimonials</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; Testimonials
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <div className="section-header">
            <h2>Stories of Care</h2>
            <p>
              Don't just take our word for it. Here is what our clients and
              their families have to say about their experience with Havenique.
            </p>
          </div>

          <div className="testimonials-page-grid">
            {loading ?
            Array(6).
            fill(0).
            map((_, i) =>
            <div key={i} className="testimonial-page-card">
                    <SkeletonLoader
                height="20px"
                width="100px"
                className="mb-4" />
              
                    <SkeletonLoader
                height="80px"
                width="100%"
                className="mb-4" />
              
                    <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  gap: '12px'
                }}>
                
                      <SkeletonLoader
                  width="48px"
                  height="48px"
                  borderRadius="50%" />
                
                      <div>
                        <SkeletonLoader
                    height="16px"
                    width="100px"
                    className="mb-2" />
                  
                        <SkeletonLoader height="14px" width="80px" />
                      </div>
                    </div>
                  </div>
            ) :
            testimonials && testimonials.length > 0 ?
            testimonials.map((testimonial: any) =>
            <div key={testimonial.id} className="testimonial-page-card">
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
            ) :

            <div
              className="empty-state"
              style={{
                gridColumn: '1 / -1'
              }}>
              
                <h3>Be the first to share your experience</h3>
                <p>We'd love to hear from you.</p>
                <Link to="/contact" className="btn btn-primary mt-4">
                  Contact Us
                </Link>
              </div>
            }
          </div>
        </div>
      </section>
    </>);

}