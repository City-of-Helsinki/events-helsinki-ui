import React from "react";

function useResetState<S>(
  initialState: S | (() => S),
  resetTime: number
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [state, setState] = React.useState<S>(initialState);

  React.useEffect(() => {
    let ignore = false;

    setTimeout(() => {
      if (!ignore) {
        setState(initialState);
      }
    }, resetTime);

    return () => {
      ignore = true;
    };
  }, [initialState, resetTime, state]);

  return [state, setState];
}

export default useResetState;
