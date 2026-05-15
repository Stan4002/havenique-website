import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { adminApi } from '../adminApi';
import { DataTable } from '../components/DataTable';
export function PricingAdmin() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminApi.getPricing();
        setPlans(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to fetch pricing:', e);
        setError('Failed to load pricing plans');
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);
  const handleEdit = (plan: any) => {
    setEditingPlan({
      ...plan,
      featuresStr: plan.features?.join('\n') || ''
    });
    setIsModalOpen(true);
  };
  const handleAdd = () => {
    setEditingPlan({
      plan_name: '',
      name: '',
      price: '',
      currency: 'ZMW',
      description: '',
      featuresStr: '',
      is_popular: false,
      isPopular: false,
      visible: true,
      order_index: plans.length + 1
    });
    setIsModalOpen(true);
  };
  const handleDelete = async (plan: any) => {
    const planName = plan.plan_name || plan.name;
    if (window.confirm(`Delete plan "${planName}"?`)) {
      try {
        setSaving(true);
        setError(null);
        await adminApi.deletePricing(plan.id);
        setPlans(plans.filter((p) => p.id !== plan.id));
      } catch (e) {
        setError('Failed to delete pricing plan. Please try again.');
      } finally {
        setSaving(false);
      }
    }
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const processedPlan = {
      plan_name: editingPlan.plan_name || editingPlan.name || '',
      price: parseFloat(editingPlan.price) || 0,
      currency: editingPlan.currency || 'ZMW',
      description: editingPlan.description || '',
      features: editingPlan.featuresStr ?
      editingPlan.featuresStr.
      split('\n').
      map((f: string) => f.trim()).
      filter(Boolean) :
      [],
      is_popular: editingPlan.is_popular || editingPlan.isPopular || false,
      visible: editingPlan.visible !== undefined ? editingPlan.visible : true,
      order_index: editingPlan.order_index || 0
    };
    try {
      setSaving(true);
      setError(null);
      if (editingPlan.id) {
        // Update existing
        const updated = await adminApi.updatePricing(editingPlan.id, processedPlan);
        setPlans(
          plans.map((p) => p.id === editingPlan.id ? updated : p)
        );
      } else {
        // Create new
        const created = await adminApi.createPricing(processedPlan);
        setPlans([...plans, created]);
      }
      setIsModalOpen(false);
    } catch (e) {
      setError('Failed to save pricing plan. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };
  const columns = [
  {
    key: 'plan_name',
    label: 'Plan Name'
  },
  {
    key: 'price',
    label: 'Price (ZMW)'
  },
  {
    key: 'is_popular',
    label: 'Popular',
    render: (val: boolean) =>
    val ?
    <span className="admin-status admin-status-warning">Popular</span> :

    '-'

  }];

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Manage Pricing Plans</h3>
        <button onClick={handleAdd} className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Plan
        </button>
      </div>

      {loading ?
      <div>Loading...</div> :

      error ? (
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
      ) :

      <DataTable
        columns={columns}
        data={plans}
        onEdit={handleEdit}
        onDelete={handleDelete} />

      }

      {isModalOpen &&
      <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingPlan.id ? 'Edit Plan' : 'Add Plan'}</h3>
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
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Plan Name</label>
                    <input
                    required
                    className="admin-input"
                    value={editingPlan.plan_name || editingPlan.name || ''}
                    onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      plan_name: e.target.value,
                      name: e.target.value
                    })
                    } />
                  
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Price (ZMW)</label>
                    <input
                    required
                    className="admin-input"
                    type="number"
                    value={editingPlan.price}
                    onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      price: parseFloat(e.target.value)
                    })
                    } />
                  
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Features (one per line)</label>
                  <textarea
                  required
                  className="admin-textarea"
                  value={editingPlan.featuresStr}
                  onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    featuresStr: e.target.value
                  })
                  }
                  style={{
                    minHeight: '150px'
                  }} />
                
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Billing Unit (e.g., Per Visit, 4 Hours)</label>
                  <input
                  className="admin-input"
                  value={editingPlan.description}
                  onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    description: e.target.value
                  })
                  }
                  placeholder="e.g., Per Visit, 4 Hours, Per Month" />
                
                </div>

                <div
                className="admin-form-group"
                style={{
                  display: 'flex',
                  gap: '20px'
                }}>
                
                  <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}>
                  
                    <input
                    type="checkbox"
                    checked={editingPlan.is_popular || editingPlan.isPopular || false}
                    onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      is_popular: e.target.checked,
                      isPopular: e.target.checked
                    })
                    } />
                  
                    <span
                    className="admin-label"
                    style={{
                      marginBottom: 0
                    }}>
                    
                      Mark as Popular
                    </span>
                  </label>
                  <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}>
                  
                    <input
                    type="checkbox"
                    checked={editingPlan.visible !== undefined ? editingPlan.visible : true}
                    onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
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
                  {saving ? 'Saving...' : 'Save Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>);

}