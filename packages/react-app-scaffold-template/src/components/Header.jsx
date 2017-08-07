import React from 'react';
import styled from 'styled-components';

import themes, { utils as theme } from '../theme';

const Header = styled.header`
  background: ${ theme.get('header/background') };
  color: ${ theme.get('header/color') };
  min-height: 64px;
  text-align: center;
  padding: 8px;
  margin: 0;
`;

export default Header;