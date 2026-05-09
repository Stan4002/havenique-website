import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { adminApi } from '../adminApi';
import { DataTable } from '../components/DataTable';
export function PricingAdmin() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  useEffect(() => {
    adminApi.getPricing().then((data) => {
      setPlans(data);
      setLoading(false);
    });
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
      name: '',
      price: '',
      featuresStr: '',
      isPopular: false,
      visible: true
    });
    setIsModalOpen(true);
  };
  const handleDelete = async (plan: any) => {
    if (window.confirm(`Delete plan "${plan.name}"?`)) {
      try {
        await adminApi.deletePricing(plan.id);
        setPlans(plans.filter((p) => p.id !== plan.id));
      } catch (e) {
        alert('Failed to delete pricing plan. Please try again.');
      }
    }
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const processedPlan = {
      ...editingPlan,
      features: editingPlan.featuresStr ?
      editingPlan.featuresStr.
      split('\n').
      map((f: string) => f.trim()).
      filter(Boolean) :
      []
    };
    delete processedPlan.featuresStr;
    try {
      if (processedPlan.id) {
        // Update existing
        const updated = await adminApi.updatePricing(processedPlan.id, processedPlan);
        setPlans(
          plans.map((p) => p.id === processedPlan.id ? updated : p)
        );
      } else {
        // Create new
        const created = await adminApi.createPricing(processedPlan);
        setPlans([...plans, created]);
      }
      setIsModalOpen(false);
    } catch (e) {
      alert('Failed to save pricing plan. Please check your connection and try again.');
    }
  };
  const columns = [
  {
    key: 'name',
    label: 'Plan Name'
  },
  {
    key: 'price',
    label: 'Price (ZMW)'
  },
  {
    key: 'isPopular',
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
              <div className="admin-modal-body">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Plan Name</label>
                    <input
                    required
                    className="admin-input"
                    value={editingPlan.name}
                    onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      name: e.target.value
                    })
                    } />
                  
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Price (ZMW)</label>
                    <input
                    required
                    className="admin-input"
                    value={editingPlan.price}
                    onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      price: e.target.value
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
                    checked={editingPlan.isPopular}
                    onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
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
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>);

}