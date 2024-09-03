import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRouter from './routes/AppRouter';

import './index.css';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <AppRouter />
        </Router>
      </UserProvider>
    </Provider>
  );
};

export default App;
