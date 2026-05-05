import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from
'react-router-dom';
// Shared Components
import { ScrollToTop } from './components/ScrollToTop';
import { PublicLayout } from './components/PublicLayout';
// Public Pages
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Services } from './pages/Services/Services';
import { Team } from './pages/Team/Team';
import { Pricing } from './pages/Pricing/Pricing';
import { Blog } from './pages/Blog/Blog';
import { BlogPost } from './pages/BlogPost/BlogPost';
import { Contact } from './pages/Contact/Contact';
import { FAQ } from './pages/FAQ/FAQ';
import { Testimonials } from './pages/Testimonials/Testimonials';
import { Privacy } from './pages/Privacy/Privacy';
import { Terms } from './pages/Terms/Terms';
import { NotFound } from './pages/NotFound/NotFound';
// Admin Components & Pages (To be created)
import { ProtectedRoute } from './admin/components/ProtectedRoute';
import { AdminLayout } from './admin/components/AdminLayout';
import { Login } from './admin/pages/Login';
import { Dashboard } from './admin/pages/Dashboard';
import { Settings } from './admin/pages/Settings';
import { AboutAdmin } from './admin/pages/AboutAdmin';
import { ServicesAdmin } from './admin/pages/ServicesAdmin';
import { StaffAdmin } from './admin/pages/StaffAdmin';
import { PricingAdmin } from './admin/pages/PricingAdmin';
import { BlogAdmin } from './admin/pages/BlogAdmin';
import { BlogEditor } from './admin/pages/BlogEditor';
import { FAQAdmin } from './admin/pages/FAQAdmin';
import { TestimonialsAdmin } from './admin/pages/TestimonialsAdmin';
import { Inbox } from './admin/pages/Inbox';
export function App() {
  return (
    <Router>
      <ScrollToTop />
      <div
        className="app-wrapper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
        
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
            <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
            
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<AboutAdmin />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="staff" element={<StaffAdmin />} />
            <Route path="pricing" element={<PricingAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="blog/new" element={<BlogEditor />} />
            <Route path="blog/:id/edit" element={<BlogEditor />} />
            <Route path="faq" element={<FAQAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="inbox" element={<Inbox />} />
          </Route>
        </Routes>
      </div>
    </Router>);

}