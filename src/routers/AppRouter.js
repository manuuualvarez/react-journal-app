import React, { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
// Reducer
import { login } from '../actions/auth';
// Routes
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { starLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged( async  user => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(starLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        })
        
    }, [ dispatch, setChecking, setIsLoggedIn ]);

    if (checking) {
        return (
            <h1> Waiting ...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={isLoggedIn} 
                        path="/auth" 
                        component={AuthRouter} 
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/" 
                        component={JournalScreen} 
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
