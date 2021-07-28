import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/Store'
import AppRoutes from './routes/AppRoutes'

const JournalApp = () => {
    return (
        <Provider store={store} >
            <AppRoutes/>
        </Provider>
    )
}

export default JournalApp
