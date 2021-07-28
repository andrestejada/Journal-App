import { NoteReducer } from "../../Reducers/NoteReducer";
import { types } from "../../types/type";

describe('Pruebas de NoteReducer', () => {
    const initiaState={
        notes:[{id:"5RYbXCPsE7eAbLBaSiuN",
        body:"probando la fecha",
        date:1618244727119,
        title:"Probando la fecha"
        }],
        active:null
    }
    test('types.notesUpdated', () => {
        const action = {
            type: types.notesUpdated,
            payload:{
                id:'1618244727119',
                note:{
                    id:'1223',
                    title:'goku',
                    body:'hola',
                    date:125411
                }
            }
        }
        const state = NoteReducer(initiaState,action);
        
        expect(state).toEqual(initiaState)
    });
});