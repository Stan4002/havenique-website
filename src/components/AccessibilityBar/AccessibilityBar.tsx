import React, { useEffect, useState } from 'react';
import { Settings, Eye, Type } from 'lucide-react';
import './AccessibilityBar.css';
export function AccessibilityBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState('md');
  const [highContrast, setHighContrast] = useState(false);
  useEffect(() => {
    // Load preferences
    const savedSize = localStorage.getItem('havenique_fontsize');
    const savedContrast = localStorage.getItem('havenique_contrast') === 'true';
    if (savedSize) setFontSize(savedSize);
    if (savedContrast) setHighContrast(savedContrast);
  }, []);
  useEffect(() => {
    // Apply classes to body
    document.body.classList.remove(
      'text-sm',
      'text-md',
      'text-lg',
      'high-contrast'
    );
    document.body.classList.add(`text-${fontSize}`);
    if (highContrast) {
      document.body.classList.add('high-contrast');
    }
    // Save preferences
    localStorage.setItem('havenique_fontsize', fontSize);
    localStorage.setItem('havenique_contrast', highContrast.toString());
  }, [fontSize, highContrast]);
  return (
    <div className="accessibility-wrapper">
      <button
        className="accessibility-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility Options"
        aria-expanded={isOpen}>
        
        <Settings size={20} />
      </button>

      <div className={`accessibility-panel ${isOpen ? 'open' : ''}`}>
        <h4>Accessibility</h4>

        <div className="accessibility-section">
          <span className="accessibility-label">
            <Type
              size={14}
              style={{
                display: 'inline',
                marginRight: 4
              }} />
            {' '}
            Text Size
          </span>
          <div className="font-size-controls">
            <button
              className={`font-btn ${fontSize === 'sm' ? 'active' : ''}`}
              onClick={() => setFontSize('sm')}
              aria-label="Small text">
              
              A-
            </button>
            <button
              className={`font-btn ${fontSize === 'md' ? 'active' : ''}`}
              onClick={() => setFontSize('md')}
              aria-label="Normal text">
              
              A
            </button>
            <button
              className={`font-btn ${fontSize === 'lg' ? 'active' : ''}`}
              onClick={() => setFontSize('lg')}
              aria-label="Large text">
              
              A+
            </button>
          </div>
        </div>

        <div className="accessibility-section">
          <button
            className={`contrast-btn ${highContrast ? 'active' : ''}`}
            onClick={() => setHighContrast(!highContrast)}
            aria-pressed={highContrast}>
            
            <Eye size={16} />
            {highContrast ? 'Standard Contrast' : 'High Contrast'}
          </button>
        </div>
      </div>
    </div>);

}