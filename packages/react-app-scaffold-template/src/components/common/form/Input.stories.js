import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { host } from 'storybook-host'

import Input from './Input'

storiesOf('Input', module)
  .addDecorator(host({
    title: 'Input field'
  }))
  .addDecorator(withKnobs)
  .add('simple label as attribute', () => (
    <Input
      id="foo"
      label="Test label"
    />
  ))
  .add('complex label as child', () => (
    <Input id="foo">
      <span>Hello there <span style="bold">I'm complex</span></span>
    </Input>
  ))