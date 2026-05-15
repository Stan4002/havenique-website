import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { adminApi } from '../adminApi';
export function AboutAdmin() {
  const [about, setAbout] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const data = await adminApi.getAbout();
        setAbout(data || {});
      } catch (e) {
        console.error('Failed to fetch about page:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    const { name, value } = e.target;
    setAbout((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateAbout(about);
      alert('About page content saved successfully!');
    } catch (e: any) {
      alert(`Failed to save: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>About Page Content</h3>
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
        
        <div className="admin-form-group">
          <label className="admin-label">Our Story</label>
          <textarea
            name="story"
            value={about.story || ''}
            onChange={handleChange}
            className="admin-textarea"
            style={{
              minHeight: '200px'
            }} />
          
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Mission Statement</label>
          <textarea
            name="mission"
            value={about.mission || ''}
            onChange={handleChange}
            className="admin-textarea" />
          
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Year Established</label>
            <input
              type="number"
              name="year_established"
              value={about.year_established || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
          <div className="admin-form-group">
            <label className="admin-label">
              Service Areas (comma separated)
            </label>
            <input
              name="service_areas"
              value={about.service_areas || ''}
              onChange={handleChange}
              className="admin-input" />
            
          </div>
        </div>
      </div>
    </div>);

}