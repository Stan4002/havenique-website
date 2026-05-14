import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { adminApi } from '../adminApi';
import { DataTable } from '../components/DataTable';
export function FAQAdmin() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    adminApi.getFaq().then((data) => {
      setFaqs(data);
      setLoading(false);
    });
  }, []);
  const handleEdit = (faq: any) => {
    setEditingFaq({
      ...faq
    });
    setIsModalOpen(true);
  };
  const handleAdd = () => {
    setEditingFaq({
      question: '',
      answer: '',
      order_index: faqs.length + 1,
      visible: true
    });
    setIsModalOpen(true);
  };
  const handleDelete = async (faq: any) => {
    if (window.confirm(`Delete FAQ?`)) {
      try {
        setSaving(true);
        setError(null);
        await adminApi.deleteFaq(faq.id);
        setFaqs(faqs.filter((f) => f.id !== faq.id));
      } catch (e) {
        setError('Failed to delete FAQ. Please try again.');
      } finally {
        setSaving(false);
      }
    }
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const dataToSave = {
        question: editingFaq.question,
        answer: editingFaq.answer,
        order_index: editingFaq.order_index,
        visible: editingFaq.visible !== undefined ? editingFaq.visible : true
      };
      if (editingFaq.id) {
        // Update existing
        const updated = await adminApi.updateFaq(editingFaq.id, dataToSave);
        setFaqs(faqs.map((f) => f.id === editingFaq.id ? updated : f));
      } else {
        // Create new
        const created = await adminApi.createFaq(dataToSave);
        setFaqs([...faqs, created]);
      }
      setIsModalOpen(false);
    } catch (e) {
      setError('Failed to save FAQ. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };
  const columns = [
  {
    key: 'question',
    label: 'Question'
  }];

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Manage FAQs</h3>
        <button onClick={handleAdd} className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {loading ?
      <div>Loading...</div> :

      <DataTable
        columns={columns}
        data={faqs}
        onEdit={handleEdit}
        onDelete={handleDelete} />

      }

      {isModalOpen &&
      <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}</h3>
              <button
              onClick={() => setIsModalOpen(false)}
              className="admin-modal-close">
              
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave}>
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
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Question</label>
                  <input
                  required
                  className="admin-input"
                  value={editingFaq.question}
                  onChange={(e) =>
                  setEditingFaq({
                    ...editingFaq,
                    question: e.target.value
                  })
                  } />
                
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Answer</label>
                  <textarea
                  required
                  className="admin-textarea"
                  value={editingFaq.answer}
                  onChange={(e) =>
                  setEditingFaq({
                    ...editingFaq,
                    answer: e.target.value
                  })
                  }
                  style={{
                    minHeight: '120px'
                  }} />
                
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Display Order</label>
                    <input
                    type="number"
                    className="admin-input"
                    value={editingFaq.order_index}
                    onChange={(e) =>
                    setEditingFaq({
                      ...editingFaq,
                      order_index: parseInt(e.target.value)
                    })
                    } />
                  
                  </div>
                </div>
                <div className="admin-form-group">
                  <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}>
                  
                    <input
                    type="checkbox"
                    checked={editingFaq.visible !== undefined ? editingFaq.visible : true}
                    onChange={(e) =>
                    setEditingFaq({
                      ...editingFaq,
                      visible: e.target.checked
                    })
                    } />
                  
                    <span
                    className="admin-label"
                    style={{
                      marginBottom: 0
                    }}>
                    
                      Visible on website
                    </span>
                  </label>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={saving}
                className="admin-btn admin-btn-secondary">
                
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  {saving ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>);

}