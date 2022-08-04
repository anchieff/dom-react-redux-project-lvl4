import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';

import LoginPage from './LoginPage';
import HomePage from './HomePage';
import SigninPage from './SigninPage';
import NotFoundPage from './NotFoundPage';
import Header from './components/Header';

import useAuth from './hooks/index';
import AuthContext from './contexts';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('user'),
  );

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            )}
          />
          <Route path="/signup" element={<SigninPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
