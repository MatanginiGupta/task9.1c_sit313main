/* Header.js */
import './Header.css';
import React, { useEffect, useState } from 'react';
import { Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Auth/Firebase';

const Header = () => {
  const [Id, setId] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authId) => {
      if (authId) {
        setId(authId);
      } else {
        setId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Id logged Out", Id);
        setId(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <header>
      <div className="deakin">
        <div className="left">
          <p>DEV@DEAKIN</p>
        </div>
        <div className="right">
          <div className="s">
            <Input icon="search plus" placeholder="Search" />
          </div>
          <div className="button">
            <Button className="post">Post</Button> {/* Update the class name to "post" */}

            {Id ? (<Button className="login" onClick={handleLogout}>Logout</Button>) :
            <Link to="/login">
              <Button className="login">Login</Button>
            </Link>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

