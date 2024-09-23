import React, { useState } from "react";
import Styled from "./Login.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import Navigation from "./Navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          email: user.email,
          displayName: user.displayName || email,
          lastLogin: new Date(),
        },
        { merge: true }
      );

      console.log("Logged in successfully:", {
        uid: user.uid,
        email: user.email,
      });
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styled.first}>
      <Navigation />
      <div className={Styled.wrapper}>
        <section className={`${Styled.form_box} ${Styled.login}`}>
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            {error && <p className={Styled.error}>{error}</p>}
            <div className={Styled.input_box}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaUser className={Styled.icon} />
            </div>
            <div className={Styled.input_box}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className={Styled.icon} />
            </div>
            <div className={Styled.remember}>
              <label>
                <input type="checkbox" /> Remember Me
              </label>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className={Styled.toggle_link}>
              <p>
                Don't Have An Account? <a href="/GAS/Register">Register</a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
