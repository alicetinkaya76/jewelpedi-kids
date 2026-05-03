import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { LocaleProvider } from './context/LocaleContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { SoundProvider } from './audio/SoundContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <SoundProvider>
          <LocaleProvider>
            <ProgressProvider>
              <App />
            </ProgressProvider>
          </LocaleProvider>
        </SoundProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
