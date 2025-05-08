import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Light theme (default) */
    --background-primary: #ffffff;
    --background-secondary: #f8f9fa;
    --text-primary: #202124;
    --text-secondary: #5f6368;
    --accent-primary: #1a73e8;
    --accent-secondary: #1557b0;
    --border-color: #e0e0e0;
    --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    --hover-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    --success-color: #34a853;
    --error-color: #ea4335;
    --warning-color: #fbbc05;
  }

  [data-theme='dark'] {
    --background-primary: #202124;
    --background-secondary: #2d2e31;
    --text-primary: #ffffff;
    --text-secondary: #9aa0a6;
    --accent-primary: #8ab4f8;
    --accent-secondary: #669df6;
    --border-color: #3c4043;
    --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    --hover-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    --success-color: #81c995;
    --error-color: #f28b82;
    --warning-color: #fdd663;
  }

  body {
    background-color: var(--background-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`; 