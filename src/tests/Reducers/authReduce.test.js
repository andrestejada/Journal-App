import { authReducer } from "../../Reducers/authReducer";
import { types } from "../../types/type";

describe('Pruebas de authReduce', () => {
    test('case types.login:', () => {
        const initialState = {};
        const action ={
            type:types.login,
            payload:{
                uid:'1230',
                displayName:'Andres'
            }
        }
        const state = authReducer(initialState,action)
        expect(state).toEqual({
            uid:'1230',
            name:'Andres'
        });
    });
    test('types.logout', () => {
        const initialState = {};
        const action ={
            type:types.logout,
        };

        const state = authReducer(initialState,action)
        expect(state).toEqual({});
    });
    test('types.logout', () => {
        const initialState = {};
        const action ={
            type: 'default',
        };

        const state = authReducer(initialState,action)
        expect(state).toEqual(initialState);
    });
});