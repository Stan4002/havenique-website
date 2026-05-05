import React from 'react';
import './SkeletonLoader.css';
interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  borderRadius?: string;
}
export function SkeletonLoader({
  width = '100%',
  height = '20px',
  className = '',
  borderRadius
}: SkeletonLoaderProps) {
  return (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        width,
        height,
        ...(borderRadius ?
        {
          borderRadius
        } :
        {})
      }} />);


}