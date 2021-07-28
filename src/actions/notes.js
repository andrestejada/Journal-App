import { db } from "../firebase/firebaseConfig";
import {types} from '../types/type';
import {LoadNotes} from '../helpers/LoadNotes'
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote=()=>{
    return async (dispatch,getState)=>{
        const {uid} = getState().auth;

        const newNote={
            title:'',
            body:'',
            date: new Date().getTime()
        };
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch( activeNote(doc.id,newNote) );
        dispatch( addNewNote(doc.id,newNote) );
        
    };
};

export const addNewNote=(id,note)=>({
    type: types.notesAddNew,
    payload:{
        id,...note
    }
})
export const activeNote=( id,note )=>({
    type: types.notesActive,
    payload:{
        id,
        ...note
    }
});

export const startLoadingNotes=(uid)=>{
    return async (dispatch)=>{
        const notes = await LoadNotes(uid);
        dispatch( setNotes(notes) );
    };
};

export const setNotes=(notes)=>({
    type: types.notesLoad,
    payload:notes
});

export const startSaveNote =(note)=>{
    return async (dispatch , getState)=>{
        const {uid} = getState().auth;

        if(!note.url){
            delete note.url
        }
        
        const noteFireStore = {...note};
        delete noteFireStore.id;
        
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteFireStore);
        Swal.fire('Guardado',note.title,'success')
        dispatch( refreshNote(note.id,note) );
    }
};

export const refreshNote =(id,note)=>({
    type: types.notesUpdated,
    payload:{
        id,note
    }
});

export const startUploading = (file)=> {
    return async(dispatch , getState)=>{
        const {active:activeNote} = getState().notes;

        Swal.fire({
            title:'Subiendo Imagen',
            text: 'Espera Pof Favor...',
            allowOutsideClick:false,
            willOpen: ()=>{
                Swal.showLoading();
            }
        });
        
        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl
        dispatch( startSaveNote(activeNote) );
        Swal.close();
        
    }
};


export const startdeletingNote=(id)=>{
    return async (dispatch,getState)=>{

        const {uid}= getState(id).auth;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch( deleteNote(id) )
        
    }
};

export const deleteNote=(id)=>({
    type:types.notesDelete,
    payload: id
})

export const notelogOut=()=>({
    type: types.notesLogoutCleaning,
});