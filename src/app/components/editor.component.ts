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
  remainingText: number = 0;
  previousLang: string = 'en';

  constructor(private readonly translationService: TranslationService) {}


  ngOnChanges(changes: SimpleChanges) {
    if(this.inputTextAreaText && this.langField !== this.previousLang){
      const distinctLang = this.langField === 'ar' ? 'en' : 'ar';
      this.translationService.translate(this.inputTextAreaText, distinctLang, this.langField).pipe().subscribe((translation: any) => {
        if(translation?.responseData?.translatedText){
          this.inputTextAreaText = translation?.responseData?.translatedText;
          this.previousLang = this.langField;
          this.getRemainingCharacters();
        }
      }, (error: any) => {
        console.log('Error in Fetching Translation: ', error);
      });
    }
  }

  getRemainingCharacters(){
    this.remainingText = 300 - this.inputTextAreaText.length;
  }

  onLangSelection(selectedLanguage: string){
    console.log('onLangSelection: ');
  }

  translationOnInput(language: string) {
    // this.lang = language;
    // const distinctLang = language === 'ar' ? 'en' : 'ar';
    // const content = this.inputText;
    // const apiUrl = `https://api.mymemory.translated.net/get?q=${content}&langpair=${distinctLang}|${language}`;
    // if (content){
    //   this.http.get<any>(apiUrl).subscribe(translatedText => {
    //     this.inputText = translatedText?.responseData?.translatedText;
    //     this.getRemainingCharacters();
    //   });
    // }
  }
}
