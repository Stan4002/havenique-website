import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../../components/PageMeta';
import './Privacy.css';
export function Privacy() {
  return (
    <>
      <PageMeta
        title="Privacy Policy | Havenique Home Based Nursing Care"
        description="Our commitment to protecting your personal and medical information." />
      

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; Privacy Policy
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <div className="privacy-content">
            <p>
              <em>Last Updated: {new Date().toLocaleDateString()}</em>
            </p>

            <h2>1. Data Collection</h2>
            <p>
              At Havenique Home Based Nursing Care, we collect personal and
              medical information necessary to provide you with the highest
              quality of care. This may include:
            </p>
            <ul>
              <li>
                Personal identification information (Name, email address, phone
                number, etc.)
              </li>
              <li>Medical history and current health status</li>
              <li>Emergency contact details</li>
              <li>Billing and payment information</li>
            </ul>

            <h2>2. How We Use Information</h2>
            <p>Your information is strictly used for the following purposes:</p>
            <ul>
              <li>
                To assess your health needs and develop a personalized care plan
              </li>
              <li>
                To communicate with you regarding appointments, services, and
                emergencies
              </li>
              <li>To process payments for services rendered</li>
              <li>
                To comply with legal and regulatory requirements in Zambia
              </li>
            </ul>

            <h2>3. Confidentiality</h2>
            <p>
              We are bound by strict medical confidentiality ethics. Your
              personal and medical data will never be shared with third parties
              without your explicit consent, except where required by law or in
              life-threatening emergencies where sharing information with other
              medical professionals is necessary for your survival.
            </p>

            <h2>4. Patient Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your medical records held by us</li>
              <li>Request corrections to any inaccurate information</li>
              <li>
                Withdraw consent for data processing (which may affect our
                ability to provide care)
              </li>
              <li>
                Request the deletion of your data, subject to legal retention
                requirements
              </li>
            </ul>

            <h2>5. Contact for Privacy Concerns</h2>
            <p>
              If you have any questions or concerns regarding our privacy
              practices, please contact us:
            </p>
            <p>
              <strong>Email:</strong> privacy@havenique.com
              <br />
              <strong>Phone:</strong> +260 97 123 4567
            </p>
          </div>
        </div>
      </section>
    </>);

}