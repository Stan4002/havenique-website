import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { adminApi } from '../adminApi';
import { DataTable } from '../components/DataTable';
export function ServicesAdmin() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const fetchServices = async () => {
    setLoading(true);
    const data = await adminApi.getServices();
    setServices(data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
    setLoading(false);
  };
  useEffect(() => {
    fetchServices();
  }, []);
  const handleEdit = (service: any) => {
    setEditingService({
      ...service
    });
    setIsModalOpen(true);
  };
  const handleAdd = () => {
    setEditingService({
      name: '',
      description: '',
      icon: 'HeartPulse',
      visible: true,
      order: services.length + 1
    });
    setIsModalOpen(true);
  };
  const handleDelete = async (service: any) => {
    if (window.confirm(`Are you sure you want to delete "${service.name}"?`)) {
      try {
        await adminApi.deleteService(service.id);
        setServices(services.filter((s) => s.id !== service.id));
      } catch (e) {
        alert('Failed to delete service. Please try again.');
      }
    }
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService.id) {
        // Update existing
        const updated = await adminApi.updateService(editingService.id, editingService);
        setServices(
          services.map((s) => s.id === editingService.id ? updated : s)
        );
      } else {
        // Create new
        const created = await adminApi.createService(editingService);
        setServices([...services, created]);
      }
      setIsModalOpen(false);
    } catch (e) {
      alert('Failed to save service. Please check your connection and try again.');
    }
  };
  const columns = [
  {
    key: 'order',
    label: 'Order'
  },
  {
    key: 'name',
    label: 'Service Name'
  },
  {
    key: 'icon',
    label: 'Icon Name'
  },
  {
    key: 'visible',
    label: 'Visibility',
    render: (val: boolean) =>
    <span
      className={`admin-status ${val ? 'admin-status-success' : 'admin-status-neutral'}`}>
      
          {val ? 'Visible' : 'Hidden'}
        </span>

  }];

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Manage Services</h3>
        <button onClick={handleAdd} className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {loading ?
      <div>Loading...</div> :

      <DataTable
        columns={columns}
        data={services}
        onEdit={handleEdit}
        onDelete={handleDelete} />

      }

      {/* Modal */}
      {isModalOpen &&
      <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingService.id ? 'Edit Service' : 'Add Service'}</h3>
              <button
              onClick={() => setIsModalOpen(false)}
              className="admin-modal-close">
              
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Service Name</label>
                  <input
                  required
                  className="admin-input"
                  value={editingService.name}
                  onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    name: e.target.value
                  })
                  } />
                
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Description</label>
                  <textarea
                  required
                  className="admin-textarea"
                  value={editingService.description}
                  onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    description: e.target.value
                  })
                  } />
                
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Icon Name (Lucide)</label>
                    <input
                    className="admin-input"
                    value={editingService.icon}
                    onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      icon: e.target.value
                    })
                    }
                    placeholder="e.g., HeartPulse, Shield" />
                  
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Display Order</label>
                    <input
                    type="number"
                    className="admin-input"
                    value={editingService.order}
                    onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      order: parseInt(e.target.value)
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
                    checked={editingService.visible}
                    onChange={(e) =>
                    setEditingService({
                      ...editingService,
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
                className="admin-btn admin-btn-secondary">
                
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>);

}