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
    published: false,
    published_at: new Date().toISOString().split('T')[0],
    author: 'admin',
    image_url: ''
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!isNew) {
      const loadPost = async () => {
        try {
          setLoading(true);
          setError(null);
          const posts = await adminApi.getBlogPosts();
          const found = Array.isArray(posts) ? posts.find((p: any) => p.id === parseInt(id)) : null;
          if (found) {
            setPost({
              ...found,
              published_at: found.published_at || new Date().toISOString().split('T')[0]
            });
          } else {
            setError('Blog post not found');
          }
        } catch (e) {
          console.error('Failed to load post:', e);
          setError('Failed to load blog post');
        } finally {
          setLoading(false);
        }
      };
      loadPost();
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
  const handleSave = async (publishStatus: boolean) => {
    const finalPost = {
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      published: publishStatus,
      published_at: publishStatus ? (post.published_at || new Date().toISOString().split('T')[0]) : null,
      author: post.author || 'admin',
      image_url: post.image_url || ''
    };
    try {
      setSaving(true);
      setError(null);
      if (isNew) {
        // Create new post
        await adminApi.createBlogPost(finalPost);
      } else {
        // Update existing post
        await adminApi.updateBlogPost(post.id, finalPost);
      }
      navigate('/admin/blog');
    } catch (e: any) {
      setError(`Failed to save post: ${e.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };
  if (loading) return <div style={{ padding: '20px' }}>Loading editor...</div>;
  
  if (error && !isNew) return (
    <div className="admin-card">
      <div style={{ 
        backgroundColor: '#fee',
        color: '#c33',
        padding: '20px',
        borderRadius: '6px',
        marginBottom: '16px',
        borderLeft: '4px solid #c33'
      }}>
        {error}
        <div style={{ marginTop: '16px' }}>
          <button 
            onClick={() => navigate('/admin/blog')}
            className="admin-btn admin-btn-secondary"
          >
            Back to Blog
          </button>
        </div>
      </div>
    </div>
  );
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
              onClick={() => handleSave(false)}
              disabled={saving}
              className="admin-btn admin-btn-secondary">
              
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="admin-btn admin-btn-primary">
              
              <Save size={16} /> {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

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
                className={`admin-status ${post.published ? 'admin-status-success' : 'admin-status-neutral'}`}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '8px'
                }}>
                
                {post.published ? 'Published' : 'Draft'}
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
                name="published_at"
                value={post.published_at || ''}
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