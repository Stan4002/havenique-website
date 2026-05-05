import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../../components/PageMeta';
import '../Privacy/Privacy.css';
export function Terms() {
  return (
    <>
      <PageMeta
        title="Terms of Service | Havenique Home Based Nursing Care"
        description="Terms and conditions for using Havenique Home Based Nursing Care services." />
      

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; Terms of Service
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <div className="privacy-content">
            <p>
              <em>Last Updated: {new Date().toLocaleDateString()}</em>
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services provided by Havenique Home
              Based Nursing Care, you agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use our
              services.
            </p>

            <h2>2. Services Provided</h2>
            <p>
              Havenique Home Based Nursing Care provides professional home-based
              nursing services in Lusaka, Zambia. Our services include but are
              not limited to:
            </p>
            <ul>
              <li>Wound dressing and post-surgical care</li>
              <li>Catheter and colostomy care</li>
              <li>Health education and counselling</li>
              <li>Palliative and dementia care</li>
              <li>Midwifery and newborn care services</li>
              <li>Medication administration and monitoring</li>
            </ul>

            <h2>3. Patient Responsibilities</h2>
            <p>As a patient or guardian, you agree to:</p>
            <ul>
              <li>
                Provide accurate and complete medical history and personal
                information
              </li>
              <li>
                Follow the care plan and instructions provided by our nursing
                staff
              </li>
              <li>
                Ensure a safe and accessible environment for our nurses during
                home visits
              </li>
              <li>
                Notify us promptly of any changes in health condition or
                medication
              </li>
              <li>Make payments for services as agreed upon</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <p>
              All prices are quoted in Zambian Kwacha (ZMW). Payment is due upon
              completion of each visit unless a package or alternative
              arrangement has been agreed upon in advance. We reserve the right
              to adjust pricing with reasonable notice.
            </p>

            <h2>5. Cancellation Policy</h2>
            <p>
              We request at least 24 hours' notice for cancellation or
              rescheduling of appointments. Late cancellations or no-shows may
              be subject to a cancellation fee. Emergency situations will be
              handled on a case-by-case basis.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              While our nurses are fully qualified and registered professionals,
              Havenique Home Based Nursing Care shall not be held liable for
              outcomes beyond our reasonable control. Our services supplement
              but do not replace emergency medical services or hospital care.
            </p>

            <h2>7. Confidentiality</h2>
            <p>
              We are committed to maintaining the confidentiality of all patient
              information in accordance with our{' '}
              <Link to="/privacy">Privacy Policy</Link>. All medical records and
              personal data are handled with the strictest confidence.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time.
              Changes will be posted on this page with an updated revision date.
              Continued use of our services after changes constitutes acceptance
              of the new terms.
            </p>

            <h2>9. Contact</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <p>
              <strong>Email:</strong> info@havenique.com
              <br />
              <strong>Phone:</strong> +260 965 556 390
            </p>
          </div>
        </div>
      </section>
    </>);

}