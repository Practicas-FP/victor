/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { messageErrorComponent } from "../services/consts";
import { auth, signInWithGoogle, registerWithEmailAndPassword } from "../services/firebase-auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surnames, setSurnames] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [err, setErr] = useState(false);
  const [msgErr, setMsgErr] = useState();
  const navigate = useNavigate();

  const register = () => {
    if (!name) {
      setErr(true);
      setMsgErr('Fill in the name field');
      return;
    }

    if (!email) {
      setErr(true);
      setMsgErr('Fill in the email field');
      return;
    }

    if (!password) {
      setErr(true);
      setMsgErr('Fill in the password field');
      return;
    }

    registerWithEmailAndPassword(name, surnames, email, password, setErr, setMsgErr);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/pokedex");
  }, [user, loading]);

  return (
    <>
      <div className="login">
        <div className="login__container">
          <h3 className="pb-3">Register</h3>

          <input type="text" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          <input type="text" className="form-control mb-2" value={surnames} onChange={(e) => setSurnames(e.target.value)} placeholder="Surnames" required />
          <input type="email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required />
          <input type="password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />

          <button className="btn btn-primary btn-md btn-block m-2" onClick={register} >
            Register
          </button>

          <a className="btn btn-lg btn-google btn-block btn-outline-danger m-2" onClick={() => signInWithGoogle(setErr, setMsgErr)}>
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Login with Google
          </a>

          <div>
            Already have an account? <Link to="/login">Login</Link> now.
          </div>

          {err && messageErrorComponent(msgErr, setErr)}
        </div>
      </div>
    </>
  );
}

export default Register;