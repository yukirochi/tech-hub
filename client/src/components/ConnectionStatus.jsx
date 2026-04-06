import { useState, useEffect } from 'react';
import { checkConnection, subscribeToConnectionStatus } from '../utils/api';
import './ConnectionStatus.css';

function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initial connection check on mount
    checkConnection();

    // Subscribe to global status changes instead of polling
    const unsubscribe = subscribeToConnectionStatus((status) => {
      setIsConnected(status === 'connected');
    });

    return unsubscribe;
  }, []);

  return (
    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
      <span className="status-dot"></span>
      {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );
}

export default ConnectionStatus;
