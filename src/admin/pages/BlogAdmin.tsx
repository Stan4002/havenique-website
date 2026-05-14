import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { adminApi } from '../adminApi';
import { DataTable } from '../components/DataTable';
export function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    adminApi.getBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);
  const handleEdit = (post: any) => {
    navigate(`/admin/blog/${post.id}/edit`);
  };
  const handlePublish = async (post: any) => {
    try {
      setSaving(true);
      setError(null);
      const updated = await adminApi.updateBlogPost(post.id, { published: !post.published });
      setPosts(posts.map((p) => p.id === post.id ? updated : p));
    } catch (e) {
      setError('Failed to update post. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (post: any) => {
    if (window.confirm(`Delete post "${post.title}"?`)) {
      try {
        setSaving(true);
        setError(null);
        await adminApi.deleteBlogPost(post.id);
        setPosts(posts.filter((p) => p.id !== post.id));
      } catch (e) {
        setError('Failed to delete blog post. Please try again.');
      } finally {
        setSaving(false);
      }
    }
  };
  const columns = [
  {
    key: 'title',
    label: 'Title'
  },
  {
    key: 'category',
    label: 'Category'
  },
  {
    key: 'published_at',
    label: 'Date',
    render: (val: string) => val ? new Date(val).toLocaleDateString() : 'Draft'
  },
  {
    key: 'published',
    label: 'Status',
    render: (val: boolean) =>
    <span
      className={`admin-status ${val ? 'admin-status-success' : 'admin-status-neutral'}`}>
      
          {val ? 'Published' : 'Draft'}
        </span>

  }];

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Manage Blog Posts</h3>
        <Link to="/admin/blog/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> New Post
        </Link>
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

      {loading ?
      <div>Loading...</div> :

      <DataTable
        columns={columns}
        data={posts}
        onEdit={handleEdit}
        onDelete={handleDelete} />

      }
    </div>);

}