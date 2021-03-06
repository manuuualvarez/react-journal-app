import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
// Sweet Alert
import Swal from 'sweetalert2';
import { notesLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({user}) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch( e => {
                dispatch(finishLoading());
                Swal.fire(
                    'Error',
                    e.message,
                    'error'
                )
            })
    }
};

export const startRegisterWithEmailAndPassword = (email, password, name) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({ user }) => { 
                await user.updateProfile({displayName: name});
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch( e => {
                dispatch(finishLoading());
                Swal.fire(
                    'Error',
                    e.message,
                    'error'
                )
            })
    }
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({ user }) => { 
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch( e => {
                dispatch(finishLoading());
                Swal.fire(
                    'Error',
                    e.message,
                    'error'
                )
            })
    }
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout());
        dispatch(notesLogout());
    }
}

export const logout = () => ({
    type: types.logout
});


