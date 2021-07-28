import { uiReducer } from "../../Reducers/ui.Reducer";
import { types } from "../../types/type";

describe('Pruebas de uiReducer', () => {
    const initialState = {
        loading:false,
        msgError:null
    };
    
    test('types.uiSetError', () => {
       const action = {
           type:types.uiSetError,
           payload:'Nuevo Error'
       } 
       const state = uiReducer(initialState,action)
       expect(state).toEqual({
        loading:false,
        msgError:'Nuevo Error'
       })
    });
    test('types.uiRemoveError', () => {
       const action = {
           type:types.uiRemoveError,
       } 
       const state = uiReducer(initialState,action)
       expect(state).toEqual(initialState)
    });
});