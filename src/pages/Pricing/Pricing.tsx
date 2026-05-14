import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PageMeta } from '../../components/PageMeta';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { useApi } from '../../hooks/useApi';
import { api } from '../../api/api';
import './Pricing.css';
export function Pricing() {
  const { data: pricingPlans, loading } = useApi(api.getPricing);
  return (
    <>
      <PageMeta
        title="Pricing | Havenique Home Based Nursing Care"
        description="Transparent pricing for home-based nursing care packages in Lusaka." />
      

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Pricing Plans</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; Pricing
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <div className="section-header">
            <h2>Transparent & Flexible Care Packages</h2>
            <p>
              Choose the level of care that best suits your needs. All plans can
              be customized.
            </p>
          </div>

          {loading ?
          <div className="pricing-grid">
              {Array(3).
            fill(0).
            map((_, i) =>
            <div key={i} className="pricing-card">
                    <SkeletonLoader
                height="30px"
                width="60%"
                className="mx-auto mb-4" />
              
                    <SkeletonLoader
                height="60px"
                width="50%"
                className="mx-auto mb-8" />
              
                    <SkeletonLoader
                height="20px"
                width="100%"
                className="mb-4" />
              
                    <SkeletonLoader
                height="20px"
                width="100%"
                className="mb-4" />
              
                    <SkeletonLoader
                height="20px"
                width="80%"
                className="mb-8" />
              
                    <SkeletonLoader
                height="48px"
                width="100%"
                className="mt-auto" />
              
                  </div>
            )}
            </div> :
          pricingPlans && pricingPlans.length > 0 ?
          <>
          <div className="pricing-grid">
                {pricingPlans.map((plan: any) =>
              <div
                key={plan.id}
                className={`pricing-card ${plan.is_popular ? 'popular' : ''}`}>
                
                    {plan.is_popular &&
                <div className="popular-badge">Most Popular</div>
                }

                    <div className="pricing-header">
                      <h3>{plan.plan_name}</h3>
                      <div className="price">
                        <span className="currency">ZMW</span>
                        <span className="amount">{plan.price}</span>
                      </div>
                      {plan.description && (
                        <div className="pricing-unit" style={{
                          fontSize: '14px',
                          color: 'var(--text-light)',
                          marginTop: '8px'
                        }}>
                          {plan.description}
                        </div>
                      )}
                    </div>

                    {plan.features && plan.features.length > 0 && (
                      <ul className="pricing-features">
                        {plan.features.map((feature: string, index: number) =>
                    <li key={index}>
                            <Check size={20} />
                            <span>{feature}</span>
                          </li>
                    )}
                      </ul>
                    )}

                    <Link
                  to="/contact"
                  className={`btn ${plan.is_popular ? 'btn-primary' : 'btn-secondary'}`}>
                  
                      Book This Plan
                    </Link>
                  </div>
              )}
              </div>
              <p className="pricing-note">
                * All prices are in Zambian Kwacha (ZMW). Custom packages
                available upon request.
              </p>
            </> :

          <div className="empty-state">
              <h3>Contact us for pricing</h3>
              <p
              style={{
                marginBottom: '24px',
                color: 'var(--text-light)'
              }}>
              
                Our pricing plans are customized based on your specific needs. Please reach out to discuss your care requirements.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Request a Custom Quote
              </Link>
            </div>
          }
        </div>
      </section>
    </>);

}