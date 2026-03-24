import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';

import { environment } from '../environments/environment'

export interface ResponseTableData {
  word: string;
  converted: string;
  response: any;
  date: string;
}

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule, 
    MatIconModule, 
    MatButtonModule,
    MatTableModule,
    MatTooltipModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('web');
  wordForm!: FormGroup;

  displayedColumns: string[] = ['word', 'converted' ,'response', 'date'];
  data: ResponseTableData[] = [];
  exampleData: ResponseTableData[] = [
    { 
      word: 'example', 
      converted: 'aeelmpx', 
      response: {"message":"Congrats, this is a successful run of the example!"}, 
      date: new Date().toLocaleString() 
    },
    { 
      word: 'example', 
      converted: 'aeelmpx', 
      response: {"error":"Server error. This is probably your fault, double check your inputs."}, 
      date: new Date().toLocaleString() 
    },
  ]
  private readonly apiUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);
  
  ngOnInit(): void {
    this.wordForm = new FormGroup({
      word: new FormControl<string>('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl<string>('', [Validators.required,Validators.email]),
    });;
  }

  onSubmit() {
    this.httpClient.post(`${this.apiUrl}/functions/v1/${this.wordForm.get('word')?.value}`, 
      { observe : 'response' }
    ).subscribe({
      next: (response) => {
        this.fetchOneElevenResponse(response)
      },
      error: (error) => {
        console.error('Error submitting form', error);
      }
    });
  }

  fetchOneElevenResponse(wordArray: any) {
    console.log('Word array from backend:', wordArray);
    const localUrl = `${this.apiUrl}/functions/v1/${this.wordForm.get('word')?.value}`;
    const oneEleven = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${localUrl}&email=${this.wordForm.get('email')!.value}`;
    
    const convertedWord = Array.isArray(wordArray?.word) ? wordArray.word.join('') : '';
    
    this.httpClient.get(oneEleven).subscribe({
      next: (response) => {
        console.log('Response from 1.11 API:', response);
        this.data.push({
          word: this.wordForm.get('word')!.value,
          converted: convertedWord,
          response: response,
          date: new Date().toLocaleString()
        });
        console.log('Updated data array:', this.data);
      },
      error: (error) => {
        console.error('Network response was not ok:', error);
        this.data.push({
          word: this.wordForm.get('word')!.value,
          converted: convertedWord,
          response: error.error || error,
          date: new Date().toLocaleString()
        });
        console.log('Updated data array:', this.data);
      }
    });
  }

  oneElevenResponseMessage(message: any): string {
    return Object.values(message)[0] as string;
  }

  oneElevenResonseSuccess(message: any): boolean {
    const messageValue = (Object.values(message)[0] as string).toLowerCase();
    if (messageValue.includes('congrats')) {
      return true;
    } 
    return false;
  }
}
