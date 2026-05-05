import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { adminApi } from '../adminApi';
import { DataTable } from '../components/DataTable';
export function FAQAdmin() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
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
      order: faqs.length + 1,
      visible: true
    });
    setIsModalOpen(true);
  };
  const handleDelete = (faq: any) => {
    if (window.confirm(`Delete FAQ?`)) {
      setFaqs(faqs.filter((f) => f.id !== faq.id));
    }
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq.id) {
      setFaqs(faqs.map((f) => f.id === editingFaq.id ? editingFaq : f));
    } else {
      setFaqs([
      ...faqs,
      {
        ...editingFaq,
        id: Date.now()
      }]
      );
    }
    setIsModalOpen(false);
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
              </div>
              <div className="admin-modal-footer">
                <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="admin-btn admin-btn-secondary">
                
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>);

}