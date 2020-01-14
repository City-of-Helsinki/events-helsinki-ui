import classNames from "classnames";
import copy from "copy-to-clipboard";
import React from "react";

const MESSAGE_DISPLAY_TIME = 4000; // 4s

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

type ButtonProps = JSX.IntrinsicElements["button"];
interface Props extends ButtonProps {
  string: string;
  successClass?: string;
  successMessage: React.ReactNode;
}

const CopyButton: React.FC<Props> = ({
  string,
  successClass = "success",
  successMessage,
  ...rest
}) => {
  const [isShowCopySuccess, setIsShowCopySuccess] = useResetState(
    false,
    MESSAGE_DISPLAY_TIME
  );

  const handleButtonClick = () => {
    copy(string);
    setIsShowCopySuccess(true);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        {...rest}
        className={classNames(rest.className, {
          [successClass]: isShowCopySuccess
        })}
      />
      {isShowCopySuccess && successMessage}
    </>
  );
};

export default CopyButton;
