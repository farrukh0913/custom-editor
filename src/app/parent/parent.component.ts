import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EditorComponent } from '../components/editor.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, EditorComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {
  actionCommandWrapper = { value: '' };
  langField: string = 'en';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  onLangSelection(selectedLanguage: string){
    this.langField = selectedLanguage;
  }
  
  actionPerform(value: string) {
    this.actionCommandWrapper = { value: value };
  }

  activeAction(event: any) {
    this.renderer.setStyle(this.el.nativeElement.querySelector('.bold'), 'color', event.bold ? '#1469C0' : '');
    this.renderer.setStyle(this.el.nativeElement.querySelector('.underline'), 'color', event.underline ? '#1469C0' : '');
    this.renderer.setStyle(this.el.nativeElement.querySelector('.insertUnorderedList'), 'color', event.insertUnorderedList ? '#1469C0' : '');
    this.renderer.setStyle(this.el.nativeElement.querySelector('.insertOrderedList'), 'color', event.insertOrderedList ? '#1469C0' : '');
  }
}
