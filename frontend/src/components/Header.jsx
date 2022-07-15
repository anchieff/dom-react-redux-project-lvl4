import React from "react";
import useAuth from "../hooks/index";

const Header = () => {
  const auth = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="/">
          DevChat
        </a>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => auth.logOut()}
        >
          Выйти
        </button>
      </div>
    </nav>
  );
};

export default Header;
