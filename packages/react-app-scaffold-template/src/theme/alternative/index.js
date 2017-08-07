
const themeVars = {
  base: '#f7f7f7',
  primary: '#5bc6e8',
  secondary: '#394a58',
  tertiary: '#7a99ac',
  grey: '#444444'
};

const theme = {
  main: {
    background: themeVars.grey,
    color: themeVars.base
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
    margin: '4px',
    padding: '4px',
    color: '#f0f',
    background: 'core/color'
  }
};

export default theme;
