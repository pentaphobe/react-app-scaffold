import React from 'react';
import styled from 'styled-components';

import themes, { utils as theme } from 'theme';

const Heading = styled.h1`
  background: transparent;
  color: ${ theme.get('base') };
  padding: 8px;
  margin: 0;
`;

export default Heading;