import React from 'react';
import style from './FullscreenLayout.style';

export default function FullscreenLayout(props) {
  const { children, ...rest } = props;
  return (
    <div css={style} {...rest}>
      {children}
    </div>
  );
}
