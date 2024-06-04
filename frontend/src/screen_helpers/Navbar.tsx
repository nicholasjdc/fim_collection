import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const {t} = useTranslation()
  //An Annotated Bibliography for East-Asian Film Studies
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>{t("nav-title")}</h1>
      </Link>

      {!user && (
        <div className="notLoggedInButtons">
          <Link to="/login">{t("login")}</Link>
          <Link to="/signup">{t("sign-up")}</Link>
        </div>
      )}
      {user && (
        <div className="loggedInButtons">
          <div className="links">
            <Link to="/">{t("home")}</Link>
            <Link to="/create">{t("new-entry")}</Link>
            <Link to="/booleanSearch">{t("search")}</Link>
          </div>
          <span>{user.email}</span>
          <button onClick={handleLogout}>{t("log-out")}</button>
        </div>
      )}
      <LanguageSelector></LanguageSelector>
    </nav>
  );
};

export default Navbar;
