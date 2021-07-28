import { Route , Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

export const PublicRoute = ({
    isAutenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} 
            component={ (props)=>(
                (isAutenticated)
                    ? <Redirect to='/' />
                    : <Component {...props} />
        )}
        />
    )
};

PublicRoute.prototype={
    isAutenticated: PropTypes.bool.isRequired,
    component:PropTypes.func.isRequired
};

