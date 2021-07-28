import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logOut, starLoginEmailAndPassword, startLogOut } from "../../actions/auth";
import { types } from "../../types/type";
import '@testing-library/jest-dom'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState={}
let store = mockStore(initState)

describe('Pruebas de action auth', () => {

    beforeEach(()=>{
      store = mockStore(initState);
    });

    test('logOut', () => {
        const logoutTest = logOut()

        expect(logoutTest).toEqual({
            type: types.logout
        })
    });

    test('login debe de retornar e payload', () => {
        const uid ='123456'
        const displayName= 'Andres'
        const logintest = login(uid,displayName);
        
        expect(logintest).toEqual({
            type: types.login,
            payload:{
                uid,
                displayName
            }
        })
    });

    test('startLogOut', async() => {
        await store.dispatch( startLogOut() );
        const actions = store.getActions()
        
        expect(actions[0]).toEqual({ type: types.logout })
        expect(actions[1]).toEqual({ type: types.notesLogoutCleaning})
    });

    test('starLoginEmailAndPassword', async() => {
        const email = 'test@testing.com'
        const password = '123456'
        await store.dispatch(starLoginEmailAndPassword(email,password))

        const actions = store.getActions()
        
        expect(actions[1]).toEqual({
            type: types.login,
            payload: { uid: 'jgv2WowUJpbUyVQcLw29vbTDezQ2', displayName: null }
          })
    });
});