import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { PageMeta } from '../../components/PageMeta';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { useApi } from '../../hooks/useApi';
import { api } from '../../api/api';
import './Team.css';
// Helper for initials
const getInitials = (name: string) => {
  return name.
  split(' ').
  map((n) => n[0]).
  join('').
  substring(0, 2).
  toUpperCase();
};
export function Team() {
  const { data: staff, loading } = useApi(api.getStaff);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const openModal = (member: any) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'unset';
  };
  return (
    <>
      <PageMeta
        title="Our Team | Havenique Home Based Nursing Care"
        description="Meet the dedicated and professional leadership and nursing team at Havenique." />
      

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Our Team</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; Team
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Professionals</h2>
            <p>
              Our team is composed of highly qualified, compassionate
              individuals dedicated to providing the best care possible.
            </p>
          </div>

          <div className="team-page-grid">
            {loading ?
            Array(3).
            fill(0).
            map((_, i) =>
            <div key={i} className="team-member-card">
                    <SkeletonLoader
                width="150px"
                height="150px"
                borderRadius="50%"
                className="mb-6" />
              
                    <SkeletonLoader
                height="28px"
                width="80%"
                className="mb-2" />
              
                    <SkeletonLoader
                height="20px"
                width="60%"
                className="mb-4" />
              
                    <SkeletonLoader
                height="40px"
                width="100%"
                className="mt-auto" />
              
                  </div>
            ) :

            staff?.map((member) =>
              <div key={member.id} className="team-member-card">
                    <div className="team-member-avatar">
                      {getInitials(member.name)}
                    </div>
                    <h3>{member.name}</h3>
                    <p className="team-member-role">{member.role}</p>

                    {member.tags && member.tags.length > 0 &&
                <div className="team-tags">
                        {member.tags.map((tag: string, index: number) =>
                  <span key={index} className="team-tag">
                            {tag}
                          </span>
                  )}
                      </div>
                }

                    <button
                  className="btn btn-secondary"
                  onClick={() => openModal(member)}>
                  
                      View Profile
                    </button>
                  </div>
              )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <div
        className={`modal-overlay ${selectedMember ? 'open' : ''}`}
        onClick={closeModal}>
        
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {selectedMember &&
          <>
              <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal">
              
                <X size={24} />
              </button>

              <div className="modal-header">
                <div className="modal-avatar">
                  {getInitials(selectedMember.name)}
                </div>
                <div className="modal-title">
                  <h3>{selectedMember.name}</h3>
                  <p
                  className="team-member-role"
                  style={{
                    marginBottom: '8px'
                  }}>
                  
                    {selectedMember.role}
                  </p>
                  <div
                  className="team-tags"
                  style={{
                    justifyContent: 'flex-start',
                    marginBottom: 0
                  }}>
                  
                    {selectedMember.tags?.map((tag: string, index: number) =>
                  <span key={index} className="team-tag">
                        {tag}
                      </span>
                  )}
                  </div>
                </div>
              </div>

              <div className="modal-body">
                <h4 className="modal-section-title">Biography</h4>
                <p className="modal-bio">
                  {selectedMember.bio || 'Biography details coming soon.'}
                </p>

                {selectedMember.qualifications &&
              selectedMember.qualifications.length > 0 &&
              <>
                      <h4 className="modal-section-title">Qualifications</h4>
                      <ul className="modal-qualifications">
                        {selectedMember.qualifications.map(
                    (qual: string, index: number) =>
                    <li key={index}>{qual}</li>

                  )}
                      </ul>
                    </>
              }
              </div>
            </>
          }
        </div>
      </div>
    </>);

}