import React, { ReactNode } from 'react';

import style from './FlexContainer.style';

type FlexContainerProps = {
  children: ReactNode;
};

export default function FlexContainer({
  children,
  ...rest
}: FlexContainerProps) {
  return (
    <div {...rest} css={style}>
      {children}
    </div>
  );
}
