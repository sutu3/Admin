import { useEffect, useRef } from 'react';

const useWebSocket = (url, onMessage, onAction) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log(`WebSocket connection established to ${url}`);
      if (onAction) onAction(socket);
    };

    socket.onclose = () => {
      console.log(`WebSocket connection closed from ${url}`);
    };

    socket.onmessage = onMessage;

    socket.onerror = (error) => {
      console.error(`WebSocket error from ${url}:`, error);
    };

    return () => {
      socket.close();
    };
  }, [url, onMessage, onAction]);

  return socketRef.current;
};

export default useWebSocket;
