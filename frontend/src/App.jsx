import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
