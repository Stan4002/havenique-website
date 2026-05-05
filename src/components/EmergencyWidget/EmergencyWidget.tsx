import React, { useEffect, useState, useRef } from 'react';
import { PhoneCall, AlertCircle } from 'lucide-react';
import { api } from '../../api/api';
import './EmergencyWidget.css';
export function EmergencyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [emergencyNumber, setEmergencyNumber] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    api.getSettings().then((data) => {
      if (data && data.emergency_number) {
        setEmergencyNumber(data.emergency_number);
      }
    });
    const handleClickOutside = (event: MouseEvent) => {
      if (
      widgetRef.current &&
      !widgetRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  if (!emergencyNumber) return null;
  return (
    <div className="emergency-widget" ref={widgetRef}>
      <div className={`emergency-popup ${isOpen ? 'open' : ''}`}>
        <h4>
          <AlertCircle size={20} /> 24/7 Emergency
        </h4>
        <p>For immediate medical assistance, call our emergency line now.</p>
        <a
          href={`tel:${emergencyNumber.replace(/\s+/g, '')}`}
          className="emergency-link">
          
          <PhoneCall size={18} />
          {emergencyNumber}
        </a>
      </div>

      <button
        className="emergency-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Emergency Contact">
        
        <PhoneCall size={24} />
      </button>
    </div>);

}