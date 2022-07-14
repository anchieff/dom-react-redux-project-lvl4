import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import useAuth from "./hooks/index";
import AuthContext from "./contexts";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const userId = localStorage.getItem("userId");

  // if (userId) setLoggedIn(true);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem("userId");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
