import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Users,
  FileText,
  Inbox,
  Plus,
  ArrowRight } from
'lucide-react';
import { adminApi } from '../adminApi';
import { DataTable } from '../components/DataTable';
export function Dashboard() {
  const [stats, setStats] = useState<any>({
    totalServices: 0,
    totalStaff: 0,
    blogPosts: 0,
    unreadMessages: 0
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await adminApi.getDashboard();
        setStats({
          totalServices: data.stats?.services || 0,
          totalStaff: data.stats?.staff || 0,
          blogPosts: data.stats?.blog_posts || 0,
          unreadMessages: data.stats?.unread_messages || 0
        });
        setRecentMessages(Array.isArray(data.recent_submissions) ? data.recent_submissions.slice(0, 5) : []);
      } catch (e) {
        console.error('Failed to fetch dashboard data:', e);
        setStats({
          totalServices: 0,
          totalStaff: 0,
          blogPosts: 0,
          unreadMessages: 0
        });
        setRecentMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  const messageColumns = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'service',
    label: 'Service'
  },
  {
    key: 'date',
    label: 'Date',
    render: (val: string) => new Date(val).toLocaleDateString()
  },
  {
    key: 'read',
    label: 'Status',
    render: (val: boolean) =>
    <span
      className={`admin-status ${val ? 'admin-status-neutral' : 'admin-status-danger'}`}>

          {val ? 'Read' : 'Unread'}
        </span>

  }];

  return (
    <div>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <div className="admin-spinner" />
        </div>
      )}
      {!loading && (<>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '30px'
        }}>
        
        <Link to="/admin/services" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Service
        </Link>
        <Link to="/admin/blog/new" className="admin-btn admin-btn-secondary">
          <Plus size={16} /> New Blog Post
        </Link>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Activity size={24} />
          </div>
          <div className="admin-stat-info">
            <h4>Total Services</h4>
            <p>{stats.totalServices}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Users size={24} />
          </div>
          <div className="admin-stat-info">
            <h4>Staff Members</h4>
            <p>{stats.totalStaff}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FileText size={24} />
          </div>
          <div className="admin-stat-info">
            <h4>Blog Posts</h4>
            <p>{stats.blogPosts}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div
            className={`admin-stat-icon ${stats.unreadMessages > 0 ? 'danger' : ''}`}>
            
            <Inbox size={24} />
          </div>
          <div className="admin-stat-info">
            <h4>Unread Messages</h4>
            <p
              style={{
                color:
                stats.unreadMessages > 0 ? 'var(--admin-danger)' : 'inherit'
              }}>
              
              {stats.unreadMessages}
            </p>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Recent Contact Submissions</h3>
          <Link
            to="/admin/inbox"
            className="admin-btn admin-btn-secondary admin-btn-sm">
            
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <DataTable columns={messageColumns} data={recentMessages} />
      </div>
      </>)}
    </div>);

}