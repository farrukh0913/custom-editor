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

  constructor() {}

  onLangSelection(selectedLanguage: string){
    this.langField = selectedLanguage;
    console.log('this.langField: ', this.langField);
  }

  onBoldSelecttion(){
    this.boldField = !this.boldField;
    console.log('this.boldField: ', this.boldField);
  }

  onUnderlineSelection(){
    this.underlineField = !this.underlineField;
    console.log('this.underlineField: ', this.underlineField);
  }

  onLinkSelection(){
    this.linkField = !this.linkField;
    console.log('this.linkField: ', this.linkField);
  }

  onBulletSelecttion(){
    this.bulletField = !this.bulletField;
    console.log('this.bulletField: ', this.bulletField);
  }

  onNumberBulletSelecttion(){
    this.numberBulletField = !this.numberBulletField;
    console.log('this.numberBulletField: ', this.numberBulletField);
  }

}
