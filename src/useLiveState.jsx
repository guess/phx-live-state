import { useState, useEffect } from 'react';
import LiveState from './LiveState';

export function useLiveState(config) {
  const [liveState] = useState(() => new LiveState(config));
  const [state, setState] = useState({});

  useEffect(() => {
    liveState.connect();
    liveState.addEventListener('livestate-change', ({ detail }) => {
      setState(detail.state);
    });

    return () => {
      liveState.disconnect();
    };
  }, [liveState]);

  const dispatch = (eventName, payload) => {
    liveState.pushEvent(eventName, payload);
  };

  return [state, dispatch];
}
