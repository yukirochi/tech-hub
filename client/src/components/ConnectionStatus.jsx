import { useState, useEffect } from 'react';
import { checkConnection } from '../utils/api';
import './ConnectionStatus.css';

function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const performCheck = async () => {
      const connected = await checkConnection();
      setIsConnected(connected);
    };

    performCheck();
    const interval = setInterval(performCheck, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
      <span className="status-dot"></span>
      {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );
}

export default ConnectionStatus;
