import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import './Signup.css';
import { createAuthUserWithEmailAndPassword, createuserdocfromAuth } from './Auth/Firebase';
import { db } from './Auth/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const link= useNavigate()
  const [contact, setcontact] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isChecked, setIsChecked] = useState(false);
  const nav = useNavigate();
  const [errors, setErrors] = useState({});
  const { displayName, email, password, confirmPassword } = contact;

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  async function handleClick() {
    const newErrors = {};

    if (!isChecked) {
      newErrors.isChecked = 'Requirement: Agree to the policy';
    }
    if (!contact.displayName) {
      newErrors.displayName = 'Kindly enter your name';
    }
    if (!contact.email) {
      newErrors.email = 'Kindly enter your email';
    }
    if (!contact.password) {
      newErrors.password = 'Kindly enter your password';
    }
    if (!contact.confirmPassword) {
      newErrors.confirmPassword = 'Kindly confirm your password';
    }
    if (contact.password !== contact.confirmPassword) {
      newErrors.confirmPassword = 'Incorrect: Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(contact.email, contact.password);
      await createuserdocfromAuth(user, { displayName: contact.displayName });
      console.log(user);
      link("/header");

      // Add a new document in collection "users"
      await addDoc(collection(db, 'users'), {
        name: { displayName: contact.displayName },
      });
      nav('/login');
    } catch (error) {
      console.log('error in creation', error.message);
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
    <body>
      <div className="container2">
        <div className="title">
          <h3> Create a DEV@DEAKIN Account</h3>
        </div>
        <Form>
          <Form.Group>
            <div className="n">
              <div className="N_label">
                <label>Enter your name</label>
              </div>
              <div className="name_input">
                <input name="displayName" type="text" placeholder="Name" onChange={handlepass} />
                {errors.displayName && <div className="error">{errors.displayName}</div>}
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <div className="n">
              <div className="N_label">
                <label>Enter an Email</label>
              </div>
              <div className="E_input">
                <input name="email" type="email" placeholder="Email" onChange={handlepass} />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <div className="n">
              <div className="N_label">
                <label>Enter a Password</label>
              </div>
              <div className="p_input">
                <input name="password" type="password" placeholder="Password" onChange={handlepass} />
                {errors.password && <div className="error">{errors.password}</div>}
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <div className="n">
              <div className="N_label">
                <label>Confirm Password</label>
              </div>
              <div className="c_p_input">
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handlepass}
                />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
              </div>
            </div>
          </Form.Group>

          <div className="checkbox">
            <Form.Checkbox label="I agree to the Terms and Conditions" checked={isChecked} onChange={handleCheckboxChange} />
          </div>
          {errors.isChecked && <div className="error">{errors.isChecked}</div>}
          <br />
          <div className="l">
            <Button onClick={handleClick}>Create</Button>
          </div>
          <br />
          <br />
        </Form>
      </div>
      <footer class="f">WELCOME USER, THANK-YOU  FOR  SIGNING UP WITH DEV@Deakin</footer>
      <br />
    </body>
  );
}

export default Signup;

