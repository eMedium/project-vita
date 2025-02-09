// ConsentBanner.tsx
import { setAnalyticsEnabled } from '@/store/settingsSlice';
import { AppDispatch } from '@/store/store';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

type ConsentBannerProps = {
  onConsentGiven: (consent: boolean) => void;
};

const ConsentBanner: React.FC<ConsentBannerProps> = ({ onConsentGiven }) => {
  const dispatch: AppDispatch = useDispatch();
  
  const [visible, setVisible] = useState(true);

  const handleAccept = () => {
    setVisible(false);
    onConsentGiven(true);
    dispatch(setAnalyticsEnabled(true));
  };

  const handleDecline = () => {
    setVisible(false);
    onConsentGiven(false);
    dispatch(setAnalyticsEnabled(false));
  };

  if (!visible) return null;

  return (
    <div className="alert alert-info shadow-lg fixed bottom-0 w-full z-50">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <span className="text-center sm:text-left mr-2">
          This game uses cookies and analytics. Do you accept?
        </span>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <button className="btn btn-primary" onClick={handleAccept}>
            Accept
          </button>
          <button className="btn btn-secondary" onClick={handleDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
