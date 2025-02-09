import App from '@/App';
import '@/config/i18n'; // Import inicjalizacji i18n
import '@/index.css';
import logger from '@/logger/logger';
import store from '@/store/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';


// Ustawienie globalnego logowania błędów
function setupGlobalErrorLogging(logErrorToFirebase: (error: any) => void) {
  window.onerror = function (message, source, lineno, colno, error) {
    logger.error("Global error caught:", { message, source, lineno, colno, error });
    logErrorToFirebase(error || message); // Wysyłanie błędu do Firebase
  };

  window.onunhandledrejection = function (event) {
    logger.error("Unhandled promise rejection:", event.reason);
    logErrorToFirebase(event.reason); // Wysyłanie powodu odrzucenia do Firebase
  };
}

const Root = () => {
  return <App />;
};


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
        <Root />
    </Provider>
  </React.StrictMode>
);
