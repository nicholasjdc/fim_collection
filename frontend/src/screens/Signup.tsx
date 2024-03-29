import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useSignup();
  const handleSumbit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };
  return (
    <form className="signup" onSubmit={handleSumbit}>
      <h3>Sign up</h3>

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
      <button>Sign Up</button>
      {error && <div className="error">{error}</div>}
      {isLoading && <div className="isLoading">Loading ...</div>}
    </form>
  );
};

export default Signup;
