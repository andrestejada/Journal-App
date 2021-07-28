import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startdeletingNote } from '../../actions/notes';
import { useForm } from '../../hooks/UseForm';
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active:note} = useSelector(state => state.notes);
    //manejar el formulario
    const [values,handleInputChange,reset] = useForm(note);
    const {title,body,id}= values;

    const activeId = useRef(note.id);
    
    useEffect(()=>{
        if( note.id !== activeId.current ){
            reset(note);
            activeId.current = note.id
        }
    },[note,reset]);

    useEffect(() => {
        dispatch( activeNote(values.id , {...values} ) )
    }, [values, dispatch]);

    const handDeleteNote =()=>{
        
        dispatch( startdeletingNote(id) )
    }

    return (
        <div className='notes__main-content' >
            <NotesAppBar/>
            <div className='notes__content' >
                <input
                    type='text'
                    placeholder='Tu titulo'
                    className='notes__title-input'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                    
                />
                <textarea
                    placeholder='Escribe algo Aqui'
                    className='notes__textarea'
                    value={body}
                    name='body'
                    onChange={handleInputChange}
                ></textarea>

               { note.url &&
                
                    <div  className='notes__image' >
                        <img
                            src={note.url}
                            alt={note.title}
                        />
                    </div>
                }
            </div>

            <button
                onClick={handDeleteNote}
                className='btn btn-danger'
            >Borrar Nota</button>
            
        </div>
    )
}

export default NoteScreen
