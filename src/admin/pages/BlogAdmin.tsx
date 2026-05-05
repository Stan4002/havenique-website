import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { adminApi } from '../adminApi';
import { DataTable } from '../components/DataTable';
export function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    adminApi.getBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);
  const handleEdit = (post: any) => {
    navigate(`/admin/blog/${post.slug}/edit`);
  };
  const handleDelete = (post: any) => {
    if (window.confirm(`Delete post "${post.title}"?`)) {
      setPosts(posts.filter((p) => p.id !== post.id));
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
    key: 'date',
    label: 'Date',
    render: (val: string) => new Date(val).toLocaleDateString()
  },
  {
    key: 'status',
    label: 'Status',
    render: (val: string) =>
    <span
      className={`admin-status ${val === 'published' ? 'admin-status-success' : 'admin-status-neutral'}`}>
      
          {val === 'published' ? 'Published' : 'Draft'}
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