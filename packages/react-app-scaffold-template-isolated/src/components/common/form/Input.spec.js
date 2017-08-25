import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Input from '../Input';

const 

describe('Input - attribute style', function () {
  it('should render without throwing an error', function() {
    expect(shallow(<Input id="foo" label="label" />);
  });
})

describe('Input - with child label', function () {
  it('should render without throwing an error', function() {
    expect(shallow(
      <Input id="foo">
    ));
  });
})