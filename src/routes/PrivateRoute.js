import { Route , Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

export const PrivateRoute = ({
    isAutenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} 
            component={ (props)=>(
                (isAutenticated)
                    ? <Component {...props} />
                    : <Redirect to='/auth/login' />
        )}
        />
    )
};

PrivateRoute.prototype={
    isAutenticated: PropTypes.bool.isRequired,
    component:PropTypes.func.isRequired
};



