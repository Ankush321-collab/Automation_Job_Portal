import { StrictMode, useState, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store/store.js';

// Auth context
export const Context = createContext({ isauthenticated: false });

const AppWrapper = () => {
  const [isauthenticated, setisauthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const [user, setuser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : {};
  });

  return (
    <ReduxProvider store={store}>
      <Context.Provider value={{ isauthenticated, setisauthenticated, user, setuser }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context.Provider>
    </ReduxProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
