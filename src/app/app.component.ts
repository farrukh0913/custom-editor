import { Component, ElementRef, Renderer2 } from '@angular/core';
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
  langField: string = 'en';
  actionCommand: string = '';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  onLangSelection(selectedLanguage: string){
    this.actionCommand = '';
    this.langField = selectedLanguage;
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

  activeAction(event: any) {
    this.renderer.setStyle(this.el.nativeElement.querySelector('.bold'), 'color', event.bold ? '#1469C0' : '');
    this.renderer.setStyle(this.el.nativeElement.querySelector('.underline'), 'color', event.underline ? '#1469C0' : '');
    this.renderer.setStyle(this.el.nativeElement.querySelector('.insertUnorderedList'), 'color', event.insertUnorderedList ? '#1469C0' : '');
    this.renderer.setStyle(this.el.nativeElement.querySelector('.insertOrderedList'), 'color', event.insertOrderedList ? '#1469C0' : '');
  }
}
