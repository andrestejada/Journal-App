import React from 'react';
import LoginScreen from '../../../components/auth/LoginScreen'
import {MemoryRouter} from 'react-router-dom'
import {mount } from 'enzyme'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'




const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState={
    auth:{},
    ui:{
        loading:false,
        msgError:null
    }
}

let store = mockStore(initState)

const wrapper = mount( 
    <Provider store={store} >
        <MemoryRouter>
            <LoginScreen/> 
        </MemoryRouter>
    </Provider>
)
 

describe('Pruebas del component <LoginScreen/>', () => {
    beforeEach(()=>{
        store = mockStore(initState)
    });
    test('se debe de renderizar correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();
    });
});