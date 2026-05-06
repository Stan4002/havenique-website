import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { adminApi } from '../adminApi';
import { DataTable } from '../components/DataTable';
import { ImageUpload } from '../components/ImageUpload';

export function StaffAdmin() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = async () => {
    setLoading(true);
    const data = await adminApi.getStaff();
    setStaff(data.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)));
    setLoading(false);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleEdit = (member: any) => {
    setEditingStaff({
      ...member,
      tagsStr: member.specialties?.join(', ') || member.tags?.join(', ') || '',
      qualStr: member.qualifications?.join('\n') || ''
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingStaff({
      name: '',
      role: '',
      title: '',
      bio: '',
      tagsStr: '',
      qualStr: '',
      visible: true,
      order_index: staff.length + 1,
      is_founder: false,
      photo_url: ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (member: any) => {
    if (window.confirm(`Are you sure you want to delete "${member.name}"?`)) {
      try {
        await adminApi.deleteStaff(member.id);
        setStaff(staff.filter((s) => s.id !== member.id));
      } catch (e) {
        alert('Failed to delete staff member. Please try again.');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const processedStaff = {
      name: editingStaff.name,
      role: editingStaff.role,
      title: editingStaff.title || editingStaff.role,
      bio: editingStaff.bio,
      specialties: editingStaff.tagsStr
        ? editingStaff.tagsStr.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [],
      qualifications: editingStaff.qualStr
        ? editingStaff.qualStr.split('\n').map((q: string) => q.trim()).filter(Boolean)
        : [],
      photo_url: editingStaff.photo_url || '',
      is_founder: editingStaff.is_founder || false,
      visible: editingStaff.visible,
      order_index: editingStaff.order_index || staff.length + 1
    };

    try {
      if (editingStaff.id) {
        // Update existing
        const updated = await adminApi.updateStaff(editingStaff.id, processedStaff);
        setStaff(staff.map((s) => s.id === editingStaff.id ? updated : s));
      } else {
        // Create new
        const created = await adminApi.createStaff(processedStaff);
        setStaff([...staff, created]);
      }
      setIsModalOpen(false);
    } catch (e: any) {
      setError('Failed to save. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { key: 'order_index', label: 'Order' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    {
      key: 'is_founder',
      label: 'Type',
      render: (val: boolean) => val ? 'Founder' : 'Staff'
    },
    {
      key: 'visible',
      label: 'Visibility',
      render: (val: boolean) => (
        <span className={`admin-status ${val ? 'admin-status-success' : 'admin-status-neutral'}`}>
          {val ? 'Visible' : 'Hidden'}
        </span>
      )
    }
  ];

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Manage Staff</h3>
        <button onClick={handleAdd} className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Staff Member
        </button>
      </div>

      {loading ? <div>Loading...</div> : (
        <DataTable
          columns={columns}
          data={staff}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingStaff.id ? 'Edit Staff Member' : 'Add Staff Member'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="admin-modal-close">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                {error && (
                  <div style={{ color: 'red', marginBottom: '12px', padding: '8px', background: '#fee', borderRadius: '4px' }}>
                    {error}
                  </div>
                )}
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Full Name</label>
                    <input
                      required
                      className="admin-input"
                      value={editingStaff.name}
                      onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Role / Title</label>
                    <input
                      required
                      className="admin-input"
                      value={editingStaff.role}
                      onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Specialty Tags (comma separated)</label>
                  <input
                    className="admin-input"
                    value={editingStaff.tagsStr}
                    onChange={(e) => setEditingStaff({ ...editingStaff, tagsStr: e.target.value })}
                    placeholder="e.g., RN, Midwife, Pediatrics"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Biography</label>
                  <textarea
                    className="admin-textarea"
                    value={editingStaff.bio}
                    onChange={(e) => setEditingStaff({ ...editingStaff, bio: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Qualifications (one per line)</label>
                  <textarea
                    className="admin-textarea"
                    value={editingStaff.qualStr}
                    onChange={(e) => setEditingStaff({ ...editingStaff, qualStr: e.target.value })}
                    placeholder="BSc Nursing&#10;Registered Nurse (GNC)"
                  />
                </div>

                <ImageUpload
                  label="Profile Photo"
                  value={editingStaff.photo_url || ''}
                  onChange={(url) => setEditingStaff({ ...editingStaff, photo_url: url })}
                />

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Display Order</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={editingStaff.order_index}
                      onChange={(e) => setEditingStaff({ ...editingStaff, order_index: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '28px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={editingStaff.visible}
                        onChange={(e) => setEditingStaff({ ...editingStaff, visible: e.target.checked })}
                      />
                      <span className="admin-label" style={{ marginBottom: 0 }}>Visible on website</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={editingStaff.is_founder}
                        onChange={(e) => setEditingStaff({ ...editingStaff, is_founder: e.target.checked })}
                      />
                      <span className="admin-label" style={{ marginBottom: 0 }}>Show in Leadership section</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  {saving ? 'Saving...' : 'Save Staff Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
