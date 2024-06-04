import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, isLoading, error} =  useLogin()
  const {t} = useTranslation()
  const handleSumbit = async (e) => {
    e.preventDefault();
    await login(email, password)
  };
  return (
    <form className="login" onSubmit={handleSumbit}>
      <h3>{t("login")}</h3>

      <label>{t("email")}:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>
      <label>{t("password")}:</label>

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <button>{t("login")}</button>
      {isLoading && <div className = "loading">{('loading')} ...</div>}
      {error && <div className = "error">{error}</div>}
    </form>
  );
};

export default Login