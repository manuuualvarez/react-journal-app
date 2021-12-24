import { db } from "../firebase/firebase-config";
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
// Alerts
import Swal from 'sweetalert2';

// Helpers
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const starLoadingNotes = (uid) =>  {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
           delete note.url; 
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

       await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
       Swal.fire('Saved', 'Your note has been saved', 'success');

       dispatch(refreshNote(note.id, noteToFirestore));
    }
}


export const refreshNote = (id, note) => ({
    type: types.notesupdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = (file) => {

    return async (disptach, getState) => {

        const {active: activeNote} = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
              },
        });

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        disptach(startSaveNote(activeNote))
        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: types.notesRemove,
    payload: id
});


export const notesLogout = () => ({
    type: types.notesLogoutCleaning
});