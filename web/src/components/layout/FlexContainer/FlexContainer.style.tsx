import { css } from '@emotion/core';

export default css`
  display: flex;
  flex-direction: column;

  .flex {
    display: flex;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .flex-center {
    justify-content: center;
    align-items: center;
  }

  .full {
    height: 100%;
    width: 100%;
  }

  .flex0 {
    flex: 0;
  }
  .flex1 {
    flex: 1;
  }
  .flex2 {
    flex: 2;
  }
  .flex3 {
    flex: 3;
  }
  .flex4 {
    flex: 4;
  }
  .flex5 {
    flex: 5;
  }
  .flex6 {
    flex: 6;
  }
`;
