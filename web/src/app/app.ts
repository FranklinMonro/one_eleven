import { Component, OnInit, signal } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('web');
  wordForm!: FormGroup;

  ngOnInit(): void {
    this.wordForm = new FormGroup({
      word: new FormControl<string>(''),
      email: new FormControl<string>('', [Validators.email]),
    });
  }

  onSubmit() {
    console.log(this.wordForm.value);
  }
}
