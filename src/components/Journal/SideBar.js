import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogOut } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import JournalEntries from './JournalEntries';

const SideBar = () => {
    const dispatch = useDispatch();
    const {name} = useSelector(state => state.auth);
    const handleLogOut =()=>{
        dispatch( startLogOut() );
    };

    const handleEntry =()=>{
        dispatch( startNewNote() );
    };
    return (
        <aside className='journal__sidebar' >
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-5' >
                    <i className='fas fa-moon'></i>
                    <span> {name}</span>
                </h3>

                <button
                    className='btn'
                    onClick={ handleLogOut }
                >Logout</button>
            </div>
            <div 
                className='journal__new-entry'
                onClick={ handleEntry} 
            >
                <i className='fas fa-calendar-plus fa-5x' ></i>
                <p className='mt-5'>Nueva Entrada</p>
            </div>
            
            <JournalEntries/>
        </aside>
    )
}

export default SideBar;