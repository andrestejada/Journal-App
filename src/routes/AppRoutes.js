import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase/firebaseConfig'
import { useDispatch } from 'react-redux';
import {
  HashRouter as Router,
  Switch,
  Redirect
  } from "react-router-dom";
import { login } from '../actions/auth';
import { JournalScreen } from '../components/Journal/JournalScreen';
import AuthRoute from './AuthRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

const AppRoutes = () => {
    //DISPARA EL SPINNER
    const [checking, setChecking] = useState(true);
    //VERIFICA QUE ES AUTENTICADO O NO
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user)=>{
            if( user?.uid){
                dispatch( login(user.uid,user.displayName) );
                setIsLoggedIn(true);
                //carga todas la notas que tenga en la BD
                dispatch( startLoadingNotes(user.uid) );
            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
       
    }, [dispatch,setChecking,setIsLoggedIn]);


    if(checking){
        return <h1> Cargando... </h1>
    }

    return (
        <Router>
            <div>
            <Switch>
                <PublicRoute isAutenticated={ isLoggedIn } path='/auth' component={AuthRoute}/>
                <PrivateRoute isAutenticated={ isLoggedIn } exact path='/' component={JournalScreen} />
                <Redirect to='/auth/login' />

            </Switch>
            </div>
        </Router>
    )
}

export default AppRoutes
