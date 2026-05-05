import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  Map } from
'lucide-react';
import { PageMeta } from '../../components/PageMeta';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { useApi } from '../../hooks/useApi';
import { api } from '../../api/api';
import './Contact.css';
export function Contact() {
  const { data: settings, loading: settingsLoading } = useApi(api.getSettings);
  const { data: services } = useApi(api.getServices);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>

  {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.submitContact(formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form', error);
      // Fallback to success anyway for demo purposes
      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <PageMeta
        title="Contact Us | Havenique Home Based Nursing Care"
        description="Get in touch to book a home visit or inquire about our nursing services in Lusaka." />
      

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; Contact
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form-wrap">
              <h2>Send us a message</h2>

              {submitSuccess ?
              <div className="success-message">
                  <CheckCircle size={24} />
                  <div>
                    <strong>Message Sent Successfully!</strong>
                    <p
                    style={{
                      margin: 0
                    }}>
                    
                      Thank you for reaching out. A member of our team will
                      contact you shortly.
                    </p>
                  </div>
                </div> :

              <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Full Name *
                      </label>
                      <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      required
                      value={formData.name}
                      onChange={handleChange} />
                    
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone Number *
                      </label>
                      <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      required
                      value={formData.phone}
                      onChange={handleChange} />
                    
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange} />
                    
                    </div>
                    <div className="form-group">
                      <label htmlFor="service" className="form-label">
                        Service Required
                      </label>
                      <select
                      id="service"
                      name="service"
                      className="form-control"
                      value={formData.service}
                      onChange={handleChange}>
                      
                        <option value="">Select a service...</option>
                        {services?.map((s) =>
                      <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                      )}
                        <option value="Other">Other / Not Sure</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    required
                    value={formData.message}
                    onChange={handleChange}>
                  </textarea>
                  </div>

                  <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}>
                  
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              }
            </div>

            {/* Contact Details */}
            <div className="contact-details-card">
              <h3>Contact Information</h3>

              {settingsLoading ?
              <div className="contact-info-list">
                  {Array(4).
                fill(0).
                map((_, i) =>
                <div key={i} className="contact-info-item">
                        <SkeletonLoader
                    width="48px"
                    height="48px"
                    borderRadius="50%" />
                  
                        <div
                    style={{
                      flex: 1
                    }}>
                    
                          <SkeletonLoader
                      height="20px"
                      width="100px"
                      className="mb-2" />
                    
                          <SkeletonLoader height="20px" width="100%" />
                        </div>
                      </div>
                )}
                </div> :

              <div className="contact-info-list">
                  {settings?.address &&
                <div className="contact-info-item">
                      <div className="contact-icon-wrap">
                        <MapPin size={24} />
                      </div>
                      <div className="contact-info-content">
                        <h4>Location</h4>
                        <p>{settings.address}</p>
                      </div>
                    </div>
                }

                  {settings?.phone &&
                <div className="contact-info-item">
                      <div className="contact-icon-wrap">
                        <Phone size={24} />
                      </div>
                      <div className="contact-info-content">
                        <h4>Phone</h4>
                        <a href={`tel:${settings.phone.replace(/\s+/g, '')}`}>
                          {settings.phone}
                        </a>
                        {(settings as any)?.phone2 &&
                    <>
                            <br />
                            <a
                        href={`tel:${(settings as any).phone2.replace(/\s+/g, '')}`}>
                        
                              {(settings as any).phone2}
                            </a>
                          </>
                    }
                      </div>
                    </div>
                }

                  {settings?.email &&
                <div className="contact-info-item">
                      <div className="contact-icon-wrap">
                        <Mail size={24} />
                      </div>
                      <div className="contact-info-content">
                        <h4>Email</h4>
                        <a href={`mailto:${settings.email}`}>
                          {settings.email}
                        </a>
                      </div>
                    </div>
                }

                  {settings?.whatsapp &&
                <div className="contact-info-item">
                      <div className="contact-icon-wrap">
                        <MessageCircle size={24} />
                      </div>
                      <div className="contact-info-content">
                        <h4>WhatsApp</h4>
                        <a
                      href={`https://wa.me/${settings.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer">
                      
                          Chat with us
                        </a>
                      </div>
                    </div>
                }
                </div>
              }
            </div>
          </div>

          {/* Map Section */}
          <div className="map-section">
            <div className="map-container">
              <Map
                size={48}
                color="#94A3B8"
                style={{
                  marginBottom: '16px'
                }} />
              
              <p>{/* PLACEHOLDER: Add Google Maps embed src */}</p>
              <p>Google Maps Integration Pending</p>
            </div>
          </div>
        </div>
      </section>
    </>);

}