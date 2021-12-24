import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Validator
import validator from 'validator';
// Error reducer
import {  removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailAndPassword } from '../../actions/auth';
// Hooks
import { useForm } from '../../hooks/useForm';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch( startRegisterWithEmailAndPassword(email, password, name) );
        }
    }

    const isFormValid = () => {
        if(name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false;
        } else if ( !validator.isEmail(email)) {
            dispatch(setError('Email is invalid'));
            return false;
        } else if (password !== password2 || password.length <= 5) {
            dispatch(setError('Passwords should be at latest 6 characters and match each other'));
            return false;
        }
        dispatch(removeError());
        return true;
    }
    
    return (
        <>
            <h3 className="auth__title"> Register </h3>

            {
                msgError !== null && (
                <div className="auth__alert-error"> { msgError } </div>
                )
            }

            <form 
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn animated__faster"
                >

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth_input"
                    autoComplete='off'
                    value={ name }
                    onChange={ handleInputChange }
                />


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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth_input"
                    autoComplete='off'
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    disabled={loading}
                >
                    Register
                </button>




                <Link to="/auth/login" className='link'>Already register?</Link>
                
            </form>
        </>
    )
}
