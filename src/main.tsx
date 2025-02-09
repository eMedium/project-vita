import App from './App';
import '@/config/i18n'; // Import inicjalizacji i18n
import '@/index.css';
import store from './store/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';


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
