import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { useRef } from 'react';
import { activeNote } from '../../actions/notes';
import { startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    
    const { active: note } = useSelector( (state) => state.notes);

    const [formValues, handleInputChange, reset ] = useForm(note);

    const { body, title, id } = formValues;

    const activeId = useRef(note.id);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    useEffect( () => {

        if(note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }

    }, [note, reset])


    useEffect( () => {
        
        dispatch(activeNote(formValues.id, {...formValues}));

    }, [formValues, dispatch]);


    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange ={ handleInputChange }
                    name="title"
                />

                <textarea
                    placeholder="Whats happen today?"
                    className="notes__textarea"
                    autoComplete="off"
                    value={body}
                    onChange ={ handleInputChange }
                    name="body"
                >

                </textarea>

                { 
                
                (note.url) &&
                <div className="notes__image">
                    <img 
                        src={note.url}
                        alt="developer"
                    />
                </div>
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete}
            >
                Delete Note
            </button>

        </div>
    )
}
