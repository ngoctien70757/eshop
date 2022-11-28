import React, { useState } from 'react';
import styles from './auth.module.scss';
import loginImg from '../../assets/login.png';
import {FaGoogle} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Loader from '../../components/Loader/Loader';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider } from "firebase/auth";
import { selectPreviousURL } from '../../redux/slice/cartSlice';
import { useSelector } from 'react-redux';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setIsLoading] =useState(false);

  const previousURL = useSelector(selectPreviousURL)

  const redirectUser = () => {
    if(previousURL.includes('cart')){
      return navigate('/cart')
    }else{
      navigate('/')
    }
  }

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        navigate('/');
        toast.success('Login Successful...');
        redirectUser()
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error('Login failed !')
      });

  }

  const signInWithGoogle = (e) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success('Login successful!');
        redirectUser()
      }).catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  return (
    <>
    {isLoading && <Loader/>}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt='Login' width={400}/>  
        </div>     
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input 
                type='text' 
                placeholder='Email' 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type='password' 
                placeholder='Password' 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}  
              />
              <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
              <div className={styles.links}>
                <Link to='/reset'>Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button onClick={signInWithGoogle} className='--btn --btn-danger --btn-block'>
              <FaGoogle color='#fff' /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to='/register'>Register</Link>
            </span>
          </div>
          </Card>
      </section>
    </>
  )
}

export default Login