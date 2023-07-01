import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Note } from '../note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  noteForm!: FormGroup;
  editForm!: FormGroup;
  notesData: any = [];
  noteObj: Note = {
    id: '',
    note_title: '',
    note_dec: '',
  };
  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      edit_title: ['', Validators.required],
      edit_description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllNotes();
  }
  //add method
  addNote() {
    const { value } = this.noteForm;
    console.log(value);
    (this.noteObj.id = ''),
      (this.noteObj.note_title = value.title),
      (this.noteObj.note_dec = value.description),
      this.noteService.addNote(this.noteObj).then((note) => {
        if (note) {
          alert('Note added successful');
          this.noteForm.reset;
        }
      });
  }
  //get method
  getAllNotes() {
    this.noteService.getNotes().subscribe((res: Note[]) => {
      console.log(res);
      this.notesData = res;
    });
  }
  //delete method
  deleteNote(note: Note) {
    let descision = confirm('You want to delete note?');
    if (descision == true) {
      this.noteService.deleteNote(note);
    }
  }

  //edit note
  updateNote() {
    const { value } = this.editForm;
    console.log(value);
  }
}
