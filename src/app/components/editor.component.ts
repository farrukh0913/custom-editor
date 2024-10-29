import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
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
  @Input() boldField = false;
  @Input() underlineField = false;
  @Input() linkField = false;
  @Input() bulletField = false;
  @Input() numberBulletField = false;

  inputTextAreaText: string = "";
  inputFieldText: string = "";
  inputFieldLang: string = "en";
  remainingText: number = 0;
  previousLang: string = 'en';

  constructor(private readonly translationService: TranslationService) {}

  ngDoCheck() {
    if (this.actionCommand){
      if (this.actionCommand === 'linkSelection'){
        this.insertLink();
      } else {
        this.formatText(this.actionCommand);
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
      console.log('this.langField: ', this.langField);
      const distinctLang = this.langField === 'ar' ? 'en' : 'ar';
      this.translationService.translate(content, distinctLang, this.langField).pipe().subscribe((translation: any) => {
        console.log('translation: ', translation);
        if(translation?.responseData?.translatedText){
          this.editorRef.nativeElement.innerHTML = translation?.responseData?.translatedText;
          this.previousLang = this.langField;
        }
      }, (error: any) => {
        console.log('Error in Fetching Translation: ', error);
      });
    }
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
        console.log('translation: ', translation);
        if(translation?.responseData?.translatedText){
          this.inputFieldText = translation?.responseData?.translatedText.replace(/<\/?p>/g, '');
          this.getRemainingCharacters();
        }
      }, (error: any) => {
        console.log('Error in Fetching Translation: ', error);
      });
    }
  }
}
