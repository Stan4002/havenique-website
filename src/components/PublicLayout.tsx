import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar/Navbar';
import { Footer } from './Footer/Footer';
import { EmergencyWidget } from './EmergencyWidget/EmergencyWidget';
import { AccessibilityBar } from './AccessibilityBar/AccessibilityBar';
import { LiveChat } from './LiveChat/LiveChat';
export function PublicLayout() {
  return (
    <>
      <AccessibilityBar />
      <Navbar />
      <main
        style={{
          flex: 1
        }}>
        
        <Outlet />
      </main>
      <Footer />
      <EmergencyWidget />
      <LiveChat />
    </>);

}