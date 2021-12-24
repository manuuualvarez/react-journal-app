import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Hooks
import { useForm } from '../../hooks/useForm';
// Actions
import {  startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';



export const LoginScreen = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui);

    const [ formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleGoogleSignIn = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className="auth__title"> Login </h3>

            <form 
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn animated__faster"
                >
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth_input"
                    autoComplete='off'
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth_input"
                    autoComplete='off'
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>


                <div className="auth__social-networks">
                    <p>Login with social media</p>
                
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleSignIn }
                        disabled={ loading }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                </div>

                <Link to="/auth/register" className='link'>Create new Account</Link>
                
            </form>
        </>
    )
}
