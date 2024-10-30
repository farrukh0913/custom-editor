import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'editor-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TranslationService],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})

export class EditorComponent {
  @ViewChild('editor') editorRef!: ElementRef<HTMLDivElement>;
  @Input() langField = 'en';
  @Input() actionCommand = '';
  @Output() activeEmitter: EventEmitter<any> = new EventEmitter<any>();

  inputTextAreaText: string = "";
  inputFieldText: string = "";
  inputFieldLang: string = "en";
  remainingText: number = 0;
  previousLang: string = 'en';
  editorTextDirection: 'ltr' | 'rtl' = 'ltr';
  inputTextDirection: 'ltr' | 'rtl' = 'ltr';
  commandState = {
    bold: false,
    underline: false,
    insertUnorderedList: false,
    insertOrderedList: false
  };

  private latinToArabicMap: { [key: string]: string } = {
    a: 'ا',   b: 'ب',   t: 'ت',   j: 'ج',   h: 'ح',   k: 'ك',   d: 'د',   r: 'ر',   s: 'س',
    q: 'ق',   w: 'و',   e: 'ئ',   f: 'ف',   g: 'غ',   z: 'ز',   x: 'خ',   c: 'چ',   v: 'پ',   n: 'ن',
    m: 'م',   y: 'ي',   o: 'ؤ',   p: 'ة',   i: 'ي',   l: 'ل',   u: 'ؤ',   ';': '؛', 
    A: 'ا',   B: 'ب',   T: 'ت',   J: 'ج',   H: 'ح',   K: 'ك',   D: 'د',   R: 'ر',   S: 'س',
    Q: 'ق',   W: 'و',   E: 'ئ',   F: 'ف',   G: 'غ',   Z: 'ز',   X: 'خ',   C: 'چ',   V: 'پ',   N: 'ن',
    M: 'م',   Y: 'ي',   O: 'ؤ',   P: 'ة',   I: 'ي',   L: 'ل',   U: 'ؤ', '.': 'ۖ',
  };

  constructor(private readonly translationService: TranslationService) {}

  ngDoCheck() {
    if (this.actionCommand){
      if (this.actionCommand === 'linkSelection'){
        this.insertLink();
      } else {
        this.formatText(this.actionCommand);
        this.commandState = {
          bold: document.queryCommandState('bold'),
          underline: document.queryCommandState('underline'),
          insertUnorderedList: document.queryCommandState('insertUnorderedList'),
          insertOrderedList: document.queryCommandState('insertOrderedList')
        }
        this.activeEmitter.emit(this.commandState);
      }
    }
  }

/**
 * get changed variables coming from parent component
 * @param changes Changes in input decorators
 */
  ngOnChanges(changes: SimpleChanges) {
    //    * On language change for Text Area field
    if(this.editorRef?.nativeElement.innerText && this.langField !== this.previousLang){
      let content = `<p>${this.editorRef?.nativeElement.innerHTML}</p>`;
      const distinctLang = this.langField === 'ar' ? 'en' : 'ar';
      this.translationService.translate(content, distinctLang, this.langField).pipe().subscribe((translation: any) => {
        if(translation?.responseData?.translatedText){
          this.editorRef.nativeElement.innerHTML = translation?.responseData?.translatedText;
          this.previousLang = this.langField;
        }
      }, (error: any) => {
        console.log('Error in Fetching Translation: ', error);
      });
    }
    this.editorTextDirection = this.langField === 'ar' ? 'rtl' : 'ltr';
  }

  formatText(command: string) {
    document.execCommand(command, false);
  }

  insertLink() {
    const url = prompt('Enter the link URL');
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.textContent = url;

      const editorElement = this.editorRef.nativeElement;
      editorElement.appendChild(link);
      editorElement.appendChild(document.createElement('br'));
    }
  }

  /**
   * get remaining characters
   */
  getRemainingCharacters(){
    this.remainingText = 300 - this.inputFieldText.length;
  }

  /**
   * On language change for text field
   * @param selectedLanguage selected language
   */
  onLangSelection(selectedLanguage: string){
    this.inputFieldLang = selectedLanguage;
    if(this.inputFieldText && this.inputFieldLang){
      const distinctLang = this.inputFieldLang === 'ar' ? 'en' : 'ar';
      this.translationService.translate(`<p>${this.inputFieldText}</p>`, distinctLang, this.inputFieldLang).pipe().subscribe((translation: any) => {
        if(translation?.responseData?.translatedText){
          this.inputFieldText = translation?.responseData?.translatedText.replace(/<\/?p>/g, '');
          this.getRemainingCharacters();
        }
      }, (error: any) => {
        console.log('Error in Fetching Translation: ', error);
      });
    }
    this.inputTextDirection = selectedLanguage === 'ar' ? 'rtl' : 'ltr';
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.langField === 'ar') {
      const char = event.key.toLowerCase();
      if (this.latinToArabicMap[char]) {
        event.preventDefault();
        this.insertText(this.latinToArabicMap[char]);
      }
    }
  }
  
  insertText(text: string) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
  
    const range = selection.getRangeAt(0);
    range.deleteContents(); // Remove selected text, if any
  
    // Create a text node for the Arabic character
    const textNode = document.createTextNode(text);
    range.insertNode(textNode); // Insert the Arabic character
  
    // Move the caret after the inserted text
    range.setStartAfter(textNode);
    range.collapse(true); // Collapse the range to the end of the inserted text
  
    // Clear the current selection and set the new range
    selection.removeAllRanges();
    selection.addRange(range);
  
    // Focus back on the editor
    this.editorRef.nativeElement.focus();
  }
  
  handleInputKeyDown(event: KeyboardEvent) {
    if (this.inputTextDirection === 'rtl') {
      const char = event.key.toLowerCase();
      if (this.latinToArabicMap[char]) {
        event.preventDefault();
        this.insertInputText(event, this.latinToArabicMap[char]);
      }
    }
  }

  insertInputText(event: KeyboardEvent, text: string) {
    const inputElement = event.target as HTMLInputElement;
    const start = inputElement.selectionStart || 0;
    const end = inputElement.selectionEnd || 0;
    this.inputFieldText = this.inputFieldText.substring(0, start) + text + this.inputFieldText.substring(end);
    this.getRemainingCharacters();
    setTimeout(() => {
      inputElement.setSelectionRange(start + text.length, start + text.length);
      inputElement.focus();
    }, 0);
  }
}
