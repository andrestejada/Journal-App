import React from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

const NotesAppBar = () => {
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes);
    const saveNote=()=>{
        dispatch( startSaveNote(active) );
    };

    const handlePictureUpload=()=>{
        document.querySelector('#inputFile').click()
    } 
    
    const handleFileChange=(e)=>{
        const file = e.target.files[0];
        if(file){
            dispatch( startUploading(file) );
        }
    };

    const actualDate = moment().format('LL')
   
    return (
        <div className='notes__appbar' >
            <span>{actualDate}</span>
            <input
                id='inputFile'
                type='file'
                name='file'
                onChange={handleFileChange}
                style={{display:'none'}}
            />
            <div>
                <button
                    className='btn'
                    onClick={handlePictureUpload}
                >Imagen</button>
                <button
                    className='btn'
                    onClick={saveNote}
                >Guardar</button>
            </div>
            
        </div>
    )
}

export default NotesAppBar
