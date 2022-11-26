import { useState, useRef, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import classes from './Login.module.css';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import FootballContext from '../../store/football-context';
const AuthForm = () => {
  // const history = useHistory();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  // const authCtx = useContext(AuthContext);
  const ctx = useContext(FootballContext);
  const [isLogin, setIsLogin] = useState(true);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    // Trigerred when either it is login or createAccount
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (isLogin) {
      signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          ctx.setLoggedIn();
          // To use the first name of user
          ctx.setUserName(user.displayName.split(' ')[0]);
          navigate('featured-matches');
          // ...
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    if (!isLogin) {
      const enteredName = nameInputRef.current.value;
      createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: enteredName,
          });
          // console.log(userCredential);
          setIsLogin(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="name" id="name" required ref={nameInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin
              ? "Don't have an account? Create one"
              : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
