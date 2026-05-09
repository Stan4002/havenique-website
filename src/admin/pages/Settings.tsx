import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { adminApi } from '../adminApi';
import { ImageUpload } from '../components/ImageUpload';
export function Settings() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    adminApi.getSettings().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateSettings(settings);
      alert('Settings saved successfully!');
    } catch (e: any) {
      alert(`Failed to save: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };
  if (loading) return <div>Loading settings...</div>;
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>General Settings</h3>
        <button
          onClick={handleSave}
          className="admin-btn admin-btn-primary"
          disabled={saving}>
          
          <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div
        style={{
          maxWidth: '800px'
        }}>
        
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Business Name</label>
            <input
              name="business_name"
              value={settings.business_name || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Slogan</label>
            <input
              name="slogan"
              value={settings.slogan || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Primary Phone</label>
            <input
              name="phone"
              value={settings.phone || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Secondary Phone</label>
            <input
              name="phone2"
              value={settings.phone2 || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Email Address</label>
            <input
              name="email"
              type="email"
              value={settings.email || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
          <div className="admin-form-group">
            <label className="admin-label">WhatsApp Number (No +)</label>
            <input
              name="whatsapp"
              value={settings.whatsapp || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Emergency Number</label>
            <input
              name="emergency_number"
              value={settings.emergency_number || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Address</label>
            <input
              name="address"
              value={settings.address || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
        </div>

        <h4
          style={{
            marginTop: '30px',
            marginBottom: '16px',
            color: 'var(--admin-blue-dark)'
          }}>
          
          Social & Integrations
        </h4>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Facebook URL</label>
            <input
              name="facebook_url"
              value={settings.facebook_url || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Instagram URL</label>
            <input
              name="instagram_url"
              value={settings.instagram_url || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">
            Google Maps Embed URL (src only)
          </label>
          <textarea
            name="map_embed"
            value={settings.map_embed || ''}
            onChange={handleChange}
            className="admin-textarea"
            style={{
              minHeight: '80px'
            }} />
          
        </div>

        <h4
          style={{
            marginTop: '30px',
            marginBottom: '16px',
            color: 'var(--admin-blue-dark)'
          }}>
          
          Branding
        </h4>

        <ImageUpload
          label="Logo"
          value={settings.logo_url || ''}
          onChange={(url) =>
          setSettings((prev) => ({
            ...prev,
            logo_url: url
          }))
          } />
        
      </div>
    </div>);

}