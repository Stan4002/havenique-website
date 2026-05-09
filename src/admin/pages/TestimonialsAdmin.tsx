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
  const handleStatusChange = async (id: number, newApproved: boolean) => {
    try {
      const updatedTestimonial = testimonials.find((t) => t.id === id);
      if (!updatedTestimonial) return;
      await adminApi.updateTestimonial(id.toString(), {
        ...updatedTestimonial,
        approved: newApproved
      });
      setTestimonials(
        testimonials.map((t) =>
        t.id === id ?
        {
          ...t,
          approved: newApproved
        } :
        t
        )
      );
    } catch (e) {
      alert('Failed to update testimonial status. Please try again.');
    }
  };
  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this testimonial permanently?')) {
      try {
        await adminApi.deleteTestimonial(id.toString());
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } catch (e) {
        alert('Failed to delete testimonial. Please try again.');
      }
    }
  };
  const filteredTestimonials = testimonials.filter(
    (t) => activeTab === 'approved' ? t.approved : !t.approved
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
            {testimonials.filter((t) => !t.approved).length})
          </button>
          <button
            className={`admin-btn ${activeTab === 'approved' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setActiveTab('approved')}>
            
            Approved (
            {testimonials.filter((t) => t.approved).length})
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
                
                      {t.client_name || t.name}
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
              
                    "{t.review || t.quote}"
                  </p>
                </div>

                <div
            style={{
              display: 'flex',
              gap: '8px',
              flexShrink: 0
            }}>
            
                  {!t.approved ?
            <button
              onClick={() => handleStatusChange(t.id, true)}
              className="admin-btn admin-btn-success admin-btn-sm"
              title="Approve">
              
                      <CheckCircle size={16} /> Approve
                    </button> :

            <button
              onClick={() => handleStatusChange(t.id, false)}
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