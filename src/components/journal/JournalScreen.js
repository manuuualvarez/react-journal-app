import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// Componentes
import { SideBar } from './SideBar';
import { NothingSelected } from './NothingSelected';
import { NoteScreen } from '../notes/NoteScreen';

    
export const JournalScreen = () => {

    const { active } = useSelector(state => state.notes);
    
    return (

        <div 
        className="journal__main-content animate__animated animate__fadeIn animated__faster"> 
            <SideBar />
            <main>
                {
                    ( active )
                    ? <NoteScreen />
                    : <NothingSelected /> 
                }
            </main>
        </div>
    )
}
