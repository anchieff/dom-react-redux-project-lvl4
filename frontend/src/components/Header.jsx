import React from "react";
import useAuth from "../hooks/index";
import { useTranslation } from "react-i18next";

const Header = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t("brand")}
        </a>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => auth.logOut()}
        >
          {t("logout")}
        </button>
      </div>
    </nav>
  );
};

export default Header;
