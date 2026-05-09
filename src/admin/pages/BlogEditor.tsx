import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { adminApi } from '../adminApi';
import { ImageUpload } from '../components/ImageUpload';
import { RichEditor } from '../components/RichEditor';
export function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const [post, setPost] = useState<any>({
    title: '',
    slug: '',
    category: '',
    excerpt: '',
    content: '',
    status: 'draft',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(!isNew);
  useEffect(() => {
    if (!isNew) {
      // In a real app, we'd fetch by ID. Using slug here since that's what we have in fallback
      adminApi.getBlogPosts().then((posts) => {
        const found = posts.find((p: any) => p.slug === id);
        if (found) setPost(found);
        setLoading(false);
      });
    }
  }, [id, isNew]);
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>

  {
    const { name, value } = e.target;
    setPost((prev: any) => {
      const updates = {
        ...prev,
        [name]: value
      };
      // Auto-generate slug from title if it's new and slug hasn't been manually edited
      if (name === 'title' && isNew) {
        updates.slug = value.
        toLowerCase().
        replace(/[^a-z0-9]+/g, '-').
        replace(/(^-|-$)+/g, '');
      }
      return updates;
    });
  };
  const handleSave = async (status: 'published' | 'draft') => {
    const finalPost = {
      ...post,
      status
    };
    try {
      if (isNew) {
        // Create new post
        await adminApi.createBlogPost(finalPost);
      } else {
        // Update existing post
        await adminApi.updateBlogPost(post.id, finalPost);
      }
      alert(
        `Post ${status === 'published' ? 'published' : 'saved as draft'} successfully!`
      );
      navigate('/admin/blog');
    } catch (e: any) {
      alert(`Failed to save post: ${e.message}`);
    }
  };
  if (loading) return <div>Loading editor...</div>;
  return (
    <div>
      <div
        style={{
          marginBottom: '20px'
        }}>
        
        <button
          onClick={() => navigate('/admin/blog')}
          className="admin-btn admin-btn-secondary admin-btn-sm">
          
          <ArrowLeft size={16} /> Back to Posts
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>{isNew ? 'Create New Post' : 'Edit Post'}</h3>
          <div
            style={{
              display: 'flex',
              gap: '12px'
            }}>
            
            <button
              onClick={() => handleSave('draft')}
              className="admin-btn admin-btn-secondary">
              
              Save Draft
            </button>
            <button
              onClick={() => handleSave('published')}
              className="admin-btn admin-btn-primary">
              
              <Save size={16} /> Publish
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '30px'
          }}>
          
          {/* Main Content Column */}
          <div>
            <div className="admin-form-group">
              <label className="admin-label">Post Title</label>
              <input
                name="title"
                value={post.title}
                onChange={handleChange}
                className="admin-input"
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold'
                }} />
              
            </div>

            <RichEditor
              value={post.content || ''}
              onChange={(val) =>
              setPost({
                ...post,
                content: val
              })
              } />
            

            <div className="admin-form-group">
              <label className="admin-label">
                Excerpt (Short summary for blog list)
              </label>
              <textarea
                name="excerpt"
                value={post.excerpt}
                onChange={handleChange}
                className="admin-textarea"
                style={{
                  minHeight: '80px'
                }} />
              
            </div>
          </div>

          {/* Sidebar Column */}
          <div>
            <div className="admin-form-group">
              <label className="admin-label">Status</label>
              <div
                className={`admin-status ${post.status === 'published' ? 'admin-status-success' : 'admin-status-neutral'}`}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '8px'
                }}>
                
                {post.status === 'published' ? 'Published' : 'Draft'}
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">URL Slug</label>
              <input
                name="slug"
                value={post.slug}
                onChange={handleChange}
                className="admin-input" />
              
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <input
                name="category"
                value={post.category}
                onChange={handleChange}
                className="admin-input"
                placeholder="e.g., Healthcare, Wellness" />
              
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Publish Date</label>
              <input
                type="date"
                name="date"
                value={post.date}
                onChange={handleChange}
                className="admin-input" />
              
            </div>

            <ImageUpload
              label="Featured Image"
              value={post.image_url || ''}
              onChange={(url) =>
              setPost({
                ...post,
                image_url: url
              })
              } />
            
          </div>
        </div>
      </div>
    </div>);

}