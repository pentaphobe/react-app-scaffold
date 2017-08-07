
const themeVars = {
  base: '#f7f7f7',
  primary: '#007bda',
  secondary: '#004165',
  tertiary: '#444444',
  grey: '#444444'
};

const theme = {
  main: {
    background: themeVars.base,
    color: themeVars.grey
  },
  button: {
    background: themeVars.primary,
    color: themeVars.base,
    border: `3px solid ${themeVars.grey}`,
    hover: {
      background: themeVars.secondary,
      color: themeVars.base,
      border: `3px solid ${themeVars.grey}`
    }
  },
  input: {
    background: themeVars.white,  
    color: themeVars.grey,
    border: `1px solid ${themeVars.grey}`
  },
  label: {
    background: 'transparent',
    color: themeVars.grey
  },
  header: {
    background: themeVars.secondary,
    color: themeVars.base
  },
  footer: {
    background: themeVars.primary,
    color: themeVars.base
  },
  core: {
    margin: '8px',
    padding: '8px',
    color: '#f0f',
    background: 'core/color'
  }
};

export default theme;
