import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { PageMeta } from '../../components/PageMeta';
export function NotFound() {
  return (
    <>
      <PageMeta
        title="Page Not Found | Havenique"
        description="The page you are looking for does not exist." />
      

      <section
        className="section section-bg"
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center'
        }}>
        
        <div
          className="container"
          style={{
            textAlign: 'center'
          }}>
          
          <AlertTriangle
            size={80}
            color="var(--gold)"
            style={{
              margin: '0 auto 24px'
            }} />
          
          <h1
            style={{
              fontSize: '48px',
              color: 'var(--blue-dark)',
              marginBottom: '16px'
            }}>
            
            404
          </h1>
          <h2
            style={{
              fontSize: '24px',
              marginBottom: '24px'
            }}>
            
            Page Not Found
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--text-light)',
              marginBottom: '40px',
              maxWidth: '500px',
              margin: '0 auto 40px'
            }}>
            
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn btn-primary">
            Return to Homepage
          </Link>
        </div>
      </section>
    </>);

}