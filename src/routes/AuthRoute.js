import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import LoginScreen from '../components/auth/LoginScreen'
import RegisterSceen from '../components/auth/RegisterSceen'

const AuthRoute = () => {
    return (
        <div className='auth__main' >
            <div className='auth__box-container' >
            <Switch>
                <Route path='/auth/login' component={LoginScreen} />
                <Route path='/auth/register' component={RegisterSceen} />
                <Redirect to='/auth/login' />
            </Switch>

            </div>
        </div>
    )
}

export default AuthRoute
