import React from 'react';
import styled from 'styled-components';

import themes, { utils as theme } from '../theme';

const Screen = styled.div`
  background: ${ theme.get('screen/background') };
  position: absolute;
  width: 100%;
  min-height: 100%;
`;

export default Screen;