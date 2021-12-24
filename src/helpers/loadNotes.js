import { db } from "../firebase/firebase-config"


export const loadNotes = async ( uid ) => {
   const notesSnap = await db.collection(`${uid}/journal/notes`).get();

   const notes = [];

   notesSnap.forEach( doc => {
       notes.push({
           id: doc.id,
           ...doc.data()
       })
   })

   return notes;
}