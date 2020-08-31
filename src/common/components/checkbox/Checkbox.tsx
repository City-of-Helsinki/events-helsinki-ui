import { Checkbox as HdsCheckbox, CheckboxProps } from 'hds-react';
import React from 'react';

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const customStyles = {
      '--background-unselected': 'var(--color-white)',
      lineHeight: '24px',
    } as React.CSSProperties;

    return (
      <HdsCheckbox
        {...props}
        style={customStyles}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
      />
    );
  }
);

export default Checkbox;
