import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Info,
  Activity,
  Users,
  CreditCard,
  FileText,
  HelpCircle,
  Star,
  Inbox,
  LogOut,
  Menu,
  X } from
'lucide-react';
import { adminApi } from '../adminApi';
import { Logo } from '../../components/Logo';
import '../admin.css';
export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Close sidebar on mobile when route changes
    setSidebarOpen(false);
  }, [location]);
  useEffect(() => {
    // Fetch unread messages count
    adminApi.getDashboard().then((data) => {
      if (data?.stats?.unreadMessages) {
        setUnreadCount(data.stats.unreadMessages);
      }
    });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('havenique_admin_token');
    navigate('/admin/login');
  };
  const navItems = [
  {
    path: '/admin/dashboard',
    icon: <LayoutDashboard size={20} />,
    label: 'Dashboard'
  },
  {
    path: '/admin/settings',
    icon: <Settings size={20} />,
    label: 'Settings'
  },
  {
    path: '/admin/about',
    icon: <Info size={20} />,
    label: 'About Page'
  },
  {
    path: '/admin/services',
    icon: <Activity size={20} />,
    label: 'Services'
  },
  {
    path: '/admin/staff',
    icon: <Users size={20} />,
    label: 'Staff'
  },
  {
    path: '/admin/pricing',
    icon: <CreditCard size={20} />,
    label: 'Pricing'
  },
  {
    path: '/admin/blog',
    icon: <FileText size={20} />,
    label: 'Blog'
  },
  {
    path: '/admin/faq',
    icon: <HelpCircle size={20} />,
    label: 'FAQ'
  },
  {
    path: '/admin/testimonials',
    icon: <Star size={20} />,
    label: 'Testimonials'
  },
  {
    path: '/admin/inbox',
    icon: <Inbox size={20} />,
    label: 'Inbox',
    badge: unreadCount
  }];

  // Get current page title
  const currentItem = navItems.find((item) =>
  location.pathname.startsWith(item.path)
  );
  const pageTitle = currentItem ? currentItem.label : 'Admin Panel';
  return (
    <div className="admin-body">
      <div className="admin-layout">
        {/* Mobile Overlay */}
        {sidebarOpen &&
        <div
          className="admin-modal-overlay"
          style={{
            zIndex: 99
          }}
          onClick={() => setSidebarOpen(false)} />

        }

        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="admin-sidebar-header">
            <Logo width={40} height={40} />
            <h2>Havenique Admin</h2>
          </div>

          <nav className="admin-nav">
            {navItems.map((item) =>
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
              `admin-nav-item ${isActive ? 'active' : ''}`
              }>
              
                {item.icon}
                <span>{item.label}</span>
                {item.badge > 0 &&
              <span className="admin-badge">{item.badge}</span>
              }
              </NavLink>
            )}
          </nav>

          <div className="admin-logout">
            <button onClick={handleLogout} className="admin-logout-btn">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <header className="admin-topbar">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
              
              <button
                className="admin-btn-secondary admin-btn-sm"
                style={{
                  display: 'none'
                }} // Would show via media query
                onClick={() => setSidebarOpen(true)}>
                
                <Menu size={20} />
              </button>
              <h1>{pageTitle}</h1>
            </div>
            <div className="admin-user-info">
              <span>admin@havenique.com</span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--admin-blue)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                
                A
              </div>
            </div>
          </header>

          <div className="admin-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>);

}