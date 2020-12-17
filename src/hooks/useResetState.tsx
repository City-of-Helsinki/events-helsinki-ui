/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

function useResetState(initialState: any, resetTime: number) {
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    let ignore = false;

    const timer = setTimeout(() => {
      if (!ignore) {
        setState(initialState);
      }
    }, resetTime);

    return () => {
      clearTimeout(timer);
      ignore = true;
    };
  }, [initialState, resetTime, state]);

  return [state, setState];
}

export default useResetState;
