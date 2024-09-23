import React, { useState } from "react";
import Styled from "./Login.module.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./Firebase";
import Navigation from "./Navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      console.log("Registered successfully:", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } catch (error) {
      console.error("Registration Error: ", error.message);
    }
  };

  return (
    <div className={Styled.first}>
      <Navigation />
      <div className={Styled.wrapper}>
        <section className={`${Styled.form_box} ${Styled.register}`}>
          <form onSubmit={handleRegister}>
            <h1>Registration</h1>
            <div className={Styled.input_box}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaUser className={Styled.icon} />
            </div>
            <div className={Styled.input_box}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className={Styled.icon} />
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
                <input type="checkbox" /> I Agree to the Terms & Conditions
              </label>
            </div>
            <button type="submit">Register</button>
            <div className={Styled.toggle_link}>
              <p>
                Already Have An Account? <a href="/">Login</a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
