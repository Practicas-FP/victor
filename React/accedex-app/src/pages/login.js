/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle, sendPasswordReset } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [emailForgotPassword, setEmailForgotPassword] = useState();
    const [efpView, setEfpView] = useState(false);

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/pokedex");
    }, [user, loading]);

    return (
        <>
            <div className="login">
                <div className="login__container">
                    <h3 className="pb-3">Log In</h3>

                    <input type="email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required />
                    <input type="password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />

                    <button className="btn btn-primary btn-md btn-block m-2" onClick={() => logInWithEmailAndPassword(email, password)} >
                        Login
                    </button>

                    <a className="btn btn-lg btn-google btn-block btn-outline-danger m-2" onClick={signInWithGoogle}>
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Login with Google
                    </a>

                    <div>
                        <a className='text-primary' onClick={() => setEfpView(!efpView)}>Forgot Password</a>
                    </div>

                    {efpView && (
                        <div class="input-group mb-3">
                            <input type="email" className="form-control mt-2" value={emailForgotPassword} onChange={(e) => setEmailForgotPassword(e.target.value)} placeholder="E-mail forgot password" required />
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button" onClick={() => sendPasswordReset(emailForgotPassword)}>Send</button>
                            </div>
                        </div>
                    )}

                    <div>
                        Don't have an account? <Link to="/register">Register</Link> now.
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;