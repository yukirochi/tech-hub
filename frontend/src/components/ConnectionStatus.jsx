import { useEffect, useState } from 'react';
import { subscribeToConnectionStatus, checkConnection } from '../utils/api';
import { FaWifi, FaTimesCircle, FaCircle } from 'react-icons/fa';

function ConnectionStatus() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    checkConnection();
    
    const unsubscribe = subscribeToConnectionStatus(setStatus);
    
    const interval = setInterval(() => {
      checkConnection();
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const getStatusDisplay = () => {
    switch (status) {
      case 'connected':
        return {
          icon: FaWifi,
          text: 'Connected',
          color: '#16a34a',
          bgColor: '#f0fdf4'
        };
      case 'disconnected':
        return {
          icon: FaTimesCircle,
          text: 'Disconnected',
          color: '#dc2626',
          bgColor: '#fee2e2'
        };
      case 'checking':
        return {
          icon: FaCircle,
          text: 'Checking...',
          color: '#f59e0b',
          bgColor: '#fef3c7'
        };
      default:
        return {
          icon: FaCircle,
          text: 'Unknown',
          color: '#6b7280',
          bgColor: '#f3f4f6'
        };
    }
  };

  const display = getStatusDisplay();
  const IconComponent = display.icon;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: display.bgColor,
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
        color: display.color,
        border: `2px solid ${display.color}`
      }}
    >
      <IconComponent style={{ fontSize: '14px' }} />
      {display.text}
    </div>
  );
}

export default ConnectionStatus;
