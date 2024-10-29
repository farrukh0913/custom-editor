import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './components/editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MatIconModule, EditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  boldField: boolean = false;
  underlineField: boolean = false;
  linkField: boolean = false;
  bulletField: boolean = false;
  numberBulletField: boolean = false;
  langField: string = 'en';
  actionCommand: string = '';

  constructor() {}

  onLangSelection(selectedLanguage: string){
    this.langField = selectedLanguage;
    console.log('this.langField: ', this.langField);
  }

  onBoldSelecttion(){
    this.actionCommand = 'bold';
  }

  onUnderlineSelection(){
    this.actionCommand = 'underline';
  }

  onLinkSelection(){
    this.actionCommand = 'linkSelection';
  }

  onBulletSelecttion(){
    this.actionCommand = 'insertUnorderedList';
  }

  onNumberBulletSelecttion(){
    this.actionCommand = 'insertOrderedList';
  }

}
