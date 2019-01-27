import * as React from 'react';
import * as css from './Button.css';

/**
 * Simple button. Nothing else
 */
const Button: React.StatelessComponent<{
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
}> = ({children, onClick}) => (
  <button className={css.button} type="button" tabIndex={0} onClick={onClick}>
    {children}
  </button>
);

export default Button;
