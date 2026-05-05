import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { adminApi } from '../adminApi';
export function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  useEffect(() => {
    adminApi.getTestimonials().then((data) => {
      setTestimonials(data);
      setLoading(false);
    });
  }, []);
  const handleStatusChange = (id: number, newStatus: string) => {
    setTestimonials(
      testimonials.map((t) =>
      t.id === id ?
      {
        ...t,
        status: newStatus
      } :
      t
      )
    );
  };
  const handleDelete = (id: number) => {
    if (window.confirm('Delete this testimonial permanently?')) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };
  const filteredTestimonials = testimonials.filter(
    (t) => t.status === activeTab
  );
  return (
    <div className="admin-card">
      <div
        className="admin-card-header"
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px'
        }}>
        
        <h3>Manage Testimonials</h3>
        <div
          style={{
            display: 'flex',
            gap: '12px'
          }}>
          
          <button
            className={`admin-btn ${activeTab === 'pending' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setActiveTab('pending')}>
            
            Pending Review (
            {testimonials.filter((t) => t.status === 'pending').length})
          </button>
          <button
            className={`admin-btn ${activeTab === 'approved' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setActiveTab('approved')}>
            
            Approved (
            {testimonials.filter((t) => t.status === 'approved').length})
          </button>
        </div>
      </div>

      {loading ?
      <div>Loading...</div> :

      <div
        style={{
          display: 'grid',
          gap: '20px'
        }}>
        
          {filteredTestimonials.length === 0 ?
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: 'var(--admin-text-light)',
            border: '1px dashed var(--admin-border)',
            borderRadius: '8px'
          }}>
          
              No {activeTab} testimonials found.
            </div> :

        filteredTestimonials.map((t) =>
        <div
          key={t.id}
          style={{
            border: '1px solid var(--admin-border)',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
          
                <div>
                  <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px'
              }}>
              
                    <strong
                style={{
                  fontSize: '16px'
                }}>
                
                      {t.name}
                    </strong>
                    <span
                style={{
                  color: 'var(--admin-text-light)',
                  fontSize: '14px'
                }}>
                
                      {t.location}
                    </span>
                    <span
                style={{
                  color: 'var(--admin-gold)'
                }}>
                
                      {'★'.repeat(t.rating)}
                    </span>
                  </div>
                  <p
              style={{
                margin: '0 0 12px 0',
                fontStyle: 'italic'
              }}>
              
                    "{t.quote}"
                  </p>
                  <div
              style={{
                fontSize: '12px',
                color: 'var(--admin-text-light)'
              }}>
              
                    Submitted: {t.date}
                  </div>
                </div>

                <div
            style={{
              display: 'flex',
              gap: '8px',
              flexShrink: 0
            }}>
            
                  {activeTab === 'pending' ?
            <button
              onClick={() => handleStatusChange(t.id, 'approved')}
              className="admin-btn admin-btn-success admin-btn-sm"
              title="Approve">
              
                      <CheckCircle size={16} /> Approve
                    </button> :

            <button
              onClick={() => handleStatusChange(t.id, 'pending')}
              className="admin-btn admin-btn-secondary admin-btn-sm"
              title="Unapprove">
              
                      <XCircle size={16} /> Unapprove
                    </button>
            }
                  <button
              onClick={() => handleDelete(t.id)}
              className="admin-btn admin-btn-danger admin-btn-sm"
              title="Delete">
              
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
        )
        }
        </div>
      }
    </div>);

}