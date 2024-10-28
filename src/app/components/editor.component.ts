import { Component, Input, SimpleChanges } from '@angular/core';
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
  @Input() langField = 'en';
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


  ngOnChanges(changes: SimpleChanges) {
    if(this.inputTextAreaText && this.langField !== this.previousLang){
      const distinctLang = this.langField === 'ar' ? 'en' : 'ar';
      this.translationService.translate(this.inputTextAreaText, distinctLang, this.langField).pipe().subscribe((translation: any) => {
        console.log('translation: ', translation);
        if(translation?.responseData?.translatedText){
          this.inputTextAreaText = translation?.responseData?.translatedText;
          this.previousLang = this.langField;
        }
      }, (error: any) => {
        console.log('Error in Fetching Translation: ', error);
      });
    }
  }

  getRemainingCharacters(){
    this.remainingText = 300 - this.inputFieldText.length;
  }

  onLangSelection(selectedLanguage: string){
    this.inputFieldLang = selectedLanguage;
    if(this.inputFieldText && this.inputFieldLang){
      const distinctLang = this.inputFieldLang === 'ar' ? 'en' : 'ar';
      this.translationService.translate(this.inputFieldText, distinctLang, this.inputFieldLang).pipe().subscribe((translation: any) => {
        console.log('translation: ', translation);
        if(translation?.responseData?.translatedText){
          this.inputFieldText = translation?.responseData?.translatedText;
          this.getRemainingCharacters();
        }
      }, (error: any) => {
        console.log('Error in Fetching Translation: ', error);
      });
    }
  }
}
