import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { adminApi } from '../adminApi';
interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}
export function ImageUpload({
  value,
  onChange,
  label = 'Upload Image'
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);
    try {
      // Upload via API
      const response = await adminApi.uploadImage(file);
      onChange(response.url);
    } catch (error) {
      console.error('Upload failed', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  return (
    <div className="admin-form-group">
      <label className="admin-label">{label}</label>

      {value ?
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          border: '1px solid var(--admin-border)',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
        
          <img
          src={value}
          alt="Uploaded"
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '200px',
            objectFit: 'cover'
          }} />
        
          <button
          type="button"
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
          
            <X size={16} />
          </button>
        </div> :

      <div
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: '2px dashed var(--admin-border)',
          borderRadius: '6px',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: 'var(--admin-bg)',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) =>
        e.currentTarget.style.borderColor = 'var(--admin-blue)'
        }
        onMouseOut={(e) =>
        e.currentTarget.style.borderColor = 'var(--admin-border)'
        }>
        
          {isUploading ?
        <div
          style={{
            color: 'var(--admin-blue)'
          }}>
          
              <div style={{
                display: 'inline-block',
                width: '32px',
                height: '32px',
                border: '4px solid var(--admin-border)',
                borderTop: '4px solid var(--admin-blue)',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
                marginBottom: '12px'
              }} />
              <div>Uploading image...</div>
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div> :

        <>
              <Upload
            size={32}
            color="var(--admin-text-light)"
            style={{
              margin: '0 auto 12px'
            }} />
          
              <div
            style={{
              color: 'var(--admin-text)',
              fontWeight: 500
            }}>
            
                Click to upload image
              </div>
              <div
            style={{
              color: 'var(--admin-text-light)',
              fontSize: '12px',
              marginTop: '4px'
            }}>
            
                JPG, PNG, GIF up to 5MB
              </div>
            </>
        }
        </div>
      }

      {uploadError && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '12px 16px',
          borderRadius: '6px',
          marginTop: '12px',
          borderLeft: '4px solid #c33',
          fontSize: '14px'
        }}>
          {uploadError}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{
          display: 'none'
        }} />
      
    </div>);

}