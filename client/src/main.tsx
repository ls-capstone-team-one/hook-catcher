import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from '@/app/App';

import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- root element is guaranteed by index.html
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
