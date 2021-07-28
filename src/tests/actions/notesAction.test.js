import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom'
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/type';
import { fileUpload } from '../../helpers/fileUpload';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../helpers/fileUpload',()=>({
  fileUpload: jest.fn( ()=>{
    return 'https://holagoku/goku.png'
  })
}))

const initState = {
  auth:{
    uid: 'TESTING'
  },
  notes:{
    active: {
      id: 'MxG8TJgGrdlKwf7Sij5k',
      title: 'Hola',
      body: 'Mundo'
  }
  }
}
let store = mockStore(initState)

describe('Pruebas del ActionNotes', () => {

  beforeEach(()=>{
    store= mockStore(initState);
  })

    test('Pruebas del startNewNote', async() => {

        await store.dispatch(startNewNote());
        const actions = store.getActions();
     
        expect(actions[0]).toEqual( {
            type: '[Note]  set active note',
            payload: {
              id: expect.any(String) ,
              title: '',
              body: '',
              date: expect.any(Number)
            }
          });
        expect(actions[1]).toEqual( {
            type: '[Note] New Note',
            payload: {
              id: expect.any(String) ,
              title: '',
              body: '',
              date: expect.any(Number)
            }
          });

          const docId = actions[0].payload.id;
          await db.doc(`/TESTING/journal/notes/${docId}`).delete()        
    });

    test('startLoadingNotes debe de cargar la notas disponibles', async ()=> {
      
      await store.dispatch(startLoadingNotes('TESTING'));
      const actions = store.getActions();
  
      expect( actions[0] ).toEqual({
        type: types.notesLoad,
        payload: expect.any(Array)
      });

      //evaluar que la primera nioa cargada haga Match con el expected

      const expected = {
          id: expect.any(String),
          body: expect.any(String),
          date: expect.any(Number),
          title:expect.any(String)
      }

      expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('startSaveNote de actualizar la nota que le pase como argumento ', async () => {
      const note = {
        id:'MxG8TJgGrdlKwf7Sij5k',
        title:'hola',
        body:'Goku'
      }
      await store.dispatch( startSaveNote(note) )

      const actions = store.getActions()
      expect(actions[0].type).toBe(types.notesUpdated);

      //que vaya y compruebe a la base de datos que el titulo sea igual al de la nota que voy a actualizar
      
      const docRef= await db.doc(`/TESTING/journal/notes/${note.id}`).get();  
      expect(docRef.data().title).toBe( note.title);
    });

    test('startUploading debe de actualizar el objeto y poner la url de la imagen en la base de datos', async() => {
      
      const file = new File([],'imagen.png')

      await store.dispatch( startUploading(file) )

      const docRef = await db.doc(`/TESTING/journal/notes/MxG8TJgGrdlKwf7Sij5k`).get();
      expect(docRef.data().url ).toBe('https://holagoku/goku.png');
    });
});