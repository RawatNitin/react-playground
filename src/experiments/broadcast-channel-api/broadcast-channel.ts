import { useEffect, useRef } from "react";

export const useBroadcastChannel = ({ onMessage }) => {
  const channelRef = useRef(null);

  useEffect(() => {
    channelRef.current = new BroadcastChannel("sync-state");

    channelRef.current.onmessage = (message) => {
      onMessage(message);
    };

    return () => {
      channelRef.current.close();
    };
  }, [onMessage]);

  const sendMessage = (message: string) => {
    if (!channelRef.current) return;
    channelRef.current.postMessage(message);
  };

  return { sendMessage };
};
