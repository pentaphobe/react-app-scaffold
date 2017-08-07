import {
  injectGlobal
} from 'styled-components';

injectGlobal`
  /**
   * 
   * Serving as an open-type temporary replacement
   *
   */
  
  /* cyrillic-ext */
  @font-face {
    font-family: 'Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Sans'), local('SansRegular'), url(https://fonts.gstatic.com/s/ptsans/v8/fhNmDCnjccoUYyU4ZASaLVKPGs1ZzpMvnHX-7fPOuAc.woff2) format('woff2');
    unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Sans'), local('SansRegular'), url(https://fonts.gstatic.com/s/ptsans/v8/BJVWev7_auVaQ__OU8Qih1KPGs1ZzpMvnHX-7fPOuAc.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Sans'), local('SansRegular'), url(https://fonts.gstatic.com/s/ptsans/v8/oysROHFTu1eTZ74Hcf8V-VKPGs1ZzpMvnHX-7fPOuAc.woff2) format('woff2');
    unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Sans'), local('SansRegular'), url(https://fonts.gstatic.com/s/ptsans/v8/CWlc_g68BGYDSGdpJvpktgLUuEpTyoUstqEm5AMlJo4.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
  }

  html, body {
    font-family: 'Sans';
  }
`;