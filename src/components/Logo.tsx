import React from 'react';
interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}
export function Logo({ className = '', width = 40, height = 40 }: LogoProps) {
  return (
    <img
      src="/havenique_icon_navbar.png"
      alt="Havenique Logo"
      className={className}
      style={{
        width,
        height,
        objectFit: 'contain',
        display: 'inline-block'
      }} />);


}