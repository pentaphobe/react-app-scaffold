import React from 'react';
import styled from 'styled-components';

import themes, { utils as theme } from '../theme';

const Footer = styled.header`
  background: ${ theme.get('footer/background') };
  color: ${ theme.get('footer/color') };
  min-height: 64px;
  text-align: center;
  padding: 8px;
  margin-top: ${ theme.get('core/margin') };
`;

export default Footer;