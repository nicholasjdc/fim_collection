import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <form className="login" onSubmit={handleSumbit}>
      <h3>Login</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>
      <label>Password:</label>

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <button>Login</button>
    </form>
  );
};

export default Login