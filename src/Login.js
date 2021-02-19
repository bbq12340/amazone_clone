import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { authService } from './firebase';
import './Login.css';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const onChange = (event) => {
        const {target: { type, value }} = event
        if (type === "email") {
            setEmail(value);
        } else if (type === "password") {
            setPassword(value);
        }
    };

    const onSignIn = (event) => {
        event.preventDefault();

        // fancy firebase login
        authService.signInWithEmailAndPassword(email, password).then((authObj) => {
            if (authObj) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
    }

    const onRegister = (event) => {
        event.preventDefault();

        // fancy firebase register
        authService.createUserWithEmailAndPassword(email, password).then((authObj) => {
            if (authObj) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
        
    }

    return (
        <div className="login">
            <Link to="/">
                <img
                    className="login__logo" 
                    src="http://pngimg.com/uploads/amazon/amazon_PNG21.png"/>
            </Link>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="email" value={email} onChange={onChange}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={onChange}/>
                    
                    <button type="submit" onClick={onSignIn} className="login__signInButton">Sign In</button>
                </form>
                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <button onClick={onRegister} className="login__registerButton">Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login 
