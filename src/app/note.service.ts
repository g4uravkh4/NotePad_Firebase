import { Injectable } from '@angular/core';
import { Note } from './note';
import {
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { collection, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private fs: Firestore) {}

  // add note here
  addNote(note: Note) {
    note.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'Notes'), note);
  }

  //get all notes form db
  getNotes(): Observable<Note[]> {
    let notesRef = collection(this.fs, 'Notes');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  //delete note from database
  deleteNote(note: Note) {
    let docRef = doc(this.fs, `Notes/${note.id}`);

    return deleteDoc(docRef);
  }

  //update notes from db
  updateNote(note: Note, notes: any) {
    let docRef = doc(this.fs, `Notes/${note.id}`);
    return updateDoc(docRef, notes);
  }
}
