import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { PageMeta } from '../../components/PageMeta';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { useApi } from '../../hooks/useApi';
import { api } from '../../api/api';
import './FAQ.css';
export function FAQ() {
  const { data: faqs, loading } = useApi(api.getFaq);
  const [openId, setOpenId] = useState<number | null>(1); // First one open by default
  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <>
      <PageMeta
        title="FAQ | Havenique Home Based Nursing Care"
        description="Frequently asked questions about our home-based nursing services in Lusaka." />
      

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; FAQ
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-intro">
              <h2>Got Questions?</h2>
              <p>
                We've compiled a list of the most common questions our clients
                ask. If you can't find what you're looking for, please don't
                hesitate to reach out.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Contact Us Directly
              </Link>
            </div>

            <div className="faq-accordion">
              {loading ?
              Array(5).
              fill(0).
              map((_, i) =>
              <div key={i} className="faq-item">
                      <div className="faq-question">
                        <SkeletonLoader height="24px" width="70%" />
                      </div>
                    </div>
              ) :
              faqs && faqs.length > 0 ?
              faqs.map((faq: any) =>
              <div
                key={faq.id}
                className={`faq-item ${openId === faq.id ? 'open' : ''}`}>
                
                    <button
                  className="faq-question"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={openId === faq.id}>
                  
                      {faq.question}
                      <ChevronDown className="faq-icon" size={24} />
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-inner">{faq.answer}</div>
                    </div>
                  </div>
              ) :

              <div className="empty-state">
                  <h3>No FAQs available</h3>
                  <p>Please check back later or contact us directly.</p>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </>);

}