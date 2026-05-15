import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { adminApi } from '../adminApi';
export function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminApi.getTestimonials();
        setTestimonials(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to fetch testimonials:', e);
        setError('Failed to load testimonials');
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);
  const handleStatusChange = async (id: number, newApproved: boolean) => {
    try {
      setSaving(true);
      setError(null);
      const updated = await adminApi.updateTestimonial(id.toString(), {
        approved: newApproved
      });
      setTestimonials(
        testimonials.map((t) =>
          t.id === id ? { ...updated } : t
        )
      );
    } catch (e) {
      setError('Failed to update testimonial status. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this testimonial permanently?')) {
      try {
        setSaving(true);
        setError(null);
        await adminApi.deleteTestimonial(id.toString());
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } catch (e) {
        setError('Failed to delete testimonial. Please try again.');
      } finally {
        setSaving(false);
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
            onClick={() => setActiveTab('pending')}
            disabled={saving}>
            
            Pending Review (
            {testimonials.filter((t) => !t.approved).length})
          </button>
          <button
            className={`admin-btn ${activeTab === 'approved' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setActiveTab('approved')}
            disabled={saving}>
            
            Approved (
            {testimonials.filter((t) => t.approved).length})
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '16px',
          borderLeft: '4px solid #c33'
        }}>
          {error}
        </div>
      )}

      {loading ?
      <div>Loading testimonials...</div> :

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
               disabled={saving}
               className="admin-btn admin-btn-success admin-btn-sm"
               title="Approve">
               
                       <CheckCircle size={16} /> Approve
                     </button> :

             <button
               onClick={() => handleStatusChange(t.id, false)}
               disabled={saving}
               className="admin-btn admin-btn-secondary admin-btn-sm"
               title="Unapprove">
               
                       <XCircle size={16} /> Unapprove
                     </button>
             }
                   <button
               onClick={() => handleDelete(t.id)}
               disabled={saving}
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