import React, { useEffect, useState } from 'react';
import { Mail, MailOpen, Phone, Calendar, Check, Trash2 } from 'lucide-react';
import { adminApi } from '../adminApi';
export function Inbox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  useEffect(() => {
    adminApi.getInbox().then((data) => {
      setMessages(data);
      setLoading(false);
    });
  }, []);
  const handleMarkAsRead = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await adminApi.markAsRead(id.toString());
      setMessages(
        messages.map((m) =>
        m.id === id ?
        {
          ...m,
          read: true
        } :
        m
        )
      );
    } catch (e: any) {
      alert(`Failed to mark as read: ${e.message}`);
    }
  };
  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this message permanently?')) {
      try {
        await adminApi.deleteMessage(id.toString());
        setMessages(messages.filter((m) => m.id !== id));
      } catch (e: any) {
        alert(`Failed to delete: ${e.message}`);
      }
    }
  };
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Inbox & Contact Submissions</h3>
      </div>

      {loading ?
      <div>Loading...</div> :

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
        
          {messages.length === 0 ?
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: 'var(--admin-text-light)',
            border: '1px dashed var(--admin-border)',
            borderRadius: '8px'
          }}>
          
              Your inbox is empty.
            </div> :

        messages.map((msg) =>
        <div
          key={msg.id}
          onClick={() =>
          setExpandedId(expandedId === msg.id ? null : msg.id)
          }
          style={{
            border: '1px solid var(--admin-border)',
            borderLeft: msg.read ?
            '1px solid var(--admin-border)' :
            '4px solid var(--admin-gold)',
            borderRadius: '8px',
            backgroundColor: msg.read ? 'var(--admin-white)' : '#FAFAFA',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'all 0.2s'
          }}>
          
                {/* Header (Always visible) */}
                <div
            style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            
                  <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
              
                    <div
                style={{
                  color: msg.read ?
                  'var(--admin-text-light)' :
                  'var(--admin-blue)'
                }}>
                
                      {msg.read ? <MailOpen size={20} /> : <Mail size={20} />}
                    </div>
                    <div>
                      <h4
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '16px',
                    fontWeight: msg.read ? 500 : 700
                  }}>
                  
                        {msg.name}
                      </h4>
                      <div
                  style={{
                    fontSize: '14px',
                    color: 'var(--admin-text-light)'
                  }}>
                  
                        Inquiry: {msg.service || 'General'}
                      </div>
                    </div>
                  </div>

                  <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
              
                    <span
                style={{
                  fontSize: '13px',
                  color: 'var(--admin-text-light)'
                }}>
                
                      {new Date(msg.date).toLocaleDateString()}
                    </span>
                    {!msg.read &&
              <button
                onClick={(e) => handleMarkAsRead(msg.id, e)}
                className="admin-btn admin-btn-secondary admin-btn-sm">
                
                        <Check size={14} /> Mark Read
                      </button>
              }
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === msg.id &&
          <div
            style={{
              padding: '20px',
              borderTop: '1px solid var(--admin-border)',
              backgroundColor: 'var(--admin-white)'
            }}>
            
                    <div
              style={{
                display: 'flex',
                gap: '24px',
                marginBottom: '20px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--admin-border)'
              }}>
              
                      <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--admin-text)'
                }}>
                
                        <Mail size={16} color="var(--admin-text-light)" />
                        <a href={`mailto:${msg.email}`}>{msg.email}</a>
                      </div>
                      <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--admin-text)'
                }}>
                
                        <Phone size={16} color="var(--admin-text-light)" />
                        <a href={`tel:${msg.phone}`}>{msg.phone}</a>
                      </div>
                      <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--admin-text)'
                }}>
                
                        <Calendar size={16} color="var(--admin-text-light)" />
                        <span>{new Date(msg.date).toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <h5
                style={{
                  margin: '0 0 8px 0',
                  color: 'var(--admin-text-light)',
                  fontSize: '14px'
                }}>
                
                        Message:
                      </h5>
                      <p
                style={{
                  margin: 0,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap'
                }}>
                
                        {msg.message}
                      </p>
                    </div>
                    <div
                      style={{
                        marginTop: '20px',
                        paddingTop: '20px',
                        borderTop: '1px solid var(--admin-border)',
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}>
                      <button
                        onClick={(e) => handleDelete(msg.id, e)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        title="Delete">
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
          }
              </div>
        )
        }
        </div>
      }
    </div>);

}