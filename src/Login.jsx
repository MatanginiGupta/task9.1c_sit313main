import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import './Login.css';
import { Link } from 'react-router-dom';
import { signinAuthUserWithEmailAndPassword } from './Auth/Firebase';
import {useNavigate} from 'react-router-dom'

function Login() {
  const link= useNavigate()
  const [contact, setcontact] = useState({
    email: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const { email, password } = contact;

  async function handleClick() {
    setError(null);
    setErrorPassword(null);

    if (!email) {
      setError('Please enter your email.');
    }

    if (!password) {
      setErrorPassword('Please enter your password.');
    }

    if (!email || !password) {
      return;
    }

    try {
      await signinAuthUserWithEmailAndPassword(email, password);
      setLoggedIn(true);
      link("/header");
      // window.location.href('/')
    } catch (err) {
      setError('Account does not exist or incorrect credentials.');
    }
  }

  function handlepass(event) {
    const value = event.target.value;
    const name = event.target.name;

    setcontact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <div className="container">
        <Form>
          <Form.Group>
            <div className="email">
              <div className="email_label">
                <label>Email</label>
              </div>
              <div className="email_input">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handlepass}
                />
              </div>
              {error && <div className="input-message">{error}</div>}
            </div>
          </Form.Group>
          <Form.Group>
            <div className="email">
              <div className="email_label">
                <label>Password</label>
              </div>
              <div className="password_input">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handlepass}
                />
              </div>
              {errorPassword && <div className="input-message">{errorPassword}</div>}
            </div>
          </Form.Group>
          <div className="checkbox">
            <Form.Checkbox label="I have read and agreed to the Terms and Conditions." />
          </div>
          <div className="l">
            
            <Button onClick={handleClick} type="submit">
              Login
            </Button>
            
            
            <Link to="/signup">
              <Button>SignUp</Button>
            </Link>
          </div>
          {loggedIn && (
            <div>
              <h3>Logged In</h3>
            </div>
          )}
        </Form>
      </div>
      <footer className="f">Welcome to login with DEV@Deakin!!</footer>
    </div>
  );
}

export default Login;


