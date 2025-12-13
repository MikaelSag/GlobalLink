import React from 'react';
import { getInitials, getColorFromString, generateAvatarBase64 } from '../utils/avatarGenerator';

/**
 * Example component showing generated avatars
 * This demonstrates how the avatar generator creates unique, 
 * colorful avatars for each user based on their name
 */
const AvatarPreview = () => {
  const demoUsers = [
    "Hyung Lee",
    "Amina Johnson", 
    "Carlos Perez",
    "Sara Kim",
    "Mohammed Ali",
    "Tony Smith",
    "Jane Doe",
    "John Paul"
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
        Auto-Generated User Avatars
      </h2>
      <p style={{ marginBottom: '30px', color: '#6b7280' }}>
        Each user gets a unique color and initials based on their name
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '20px'
      }}>
        {demoUsers.map(name => {
          const avatar = generateAvatarBase64(name, 120);
          const initials = getInitials(name);
          const color = getColorFromString(name);
          
          return (
            <div 
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <img 
                src={avatar}
                alt={name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '3px solid white',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>{name}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {initials} • {color}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
          How It Works
        </h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#4b5563', lineHeight: '1.8' }}>
          <li>Each name generates a deterministic color (same name = same color always)</li>
          <li>Initials extracted from first and last name</li>
          <li>SVG avatar created and converted to base64</li>
          <li>Stored in Redux on app load</li>
          <li>Users can upload real photos to replace these defaults</li>
        </ul>
      </div>
    </div>
  );
};

export default AvatarPreview;
