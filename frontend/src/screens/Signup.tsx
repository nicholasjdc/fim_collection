import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useTranslation } from "react-i18next";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useSignup();
  const {t} = useTranslation()
  const handleSumbit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };
  return (
    <form className="signup" onSubmit={handleSumbit}>
      <h3>{t("sign-up")}</h3>

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
      <button>{t("sign-up")}</button>
      {error && <div className="error">{error}</div>}
      {isLoading && <div className="isLoading">{t("loading")} ...</div>}
    </form>
  );
};

export default Signup;
