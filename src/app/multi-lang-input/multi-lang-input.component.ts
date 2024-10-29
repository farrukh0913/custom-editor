import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextEditorComponent } from "../text-editor/text-editor.component";

@Component({
  selector: 'app-multi-lang-input',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, TextEditorComponent],
  templateUrl: './multi-lang-input.component.html',
  styleUrl: './multi-lang-input.component.scss'
})
export class MultiLangInputComponent {
  @ViewChild('editor') editorRef!: ElementRef<HTMLDivElement>;
  currentLang: string = "en";
  currentLangInput: string = "en";
  inputText: string = "";

  constructor(private http: HttpClient) {}

  formatText(command: string) {
    const editor = this.editorRef.nativeElement;
    document.execCommand(command, false);
    editor.focus();
  }

  isCommandActive(command: string): boolean {
    return document.queryCommandState(command);
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

  changeRichLanguage(lang: string) {
    this.currentLang = lang;
    const distinctLang = lang === 'ar' ? 'en' : 'ar';
    let content = `<p>${this.editorRef.nativeElement.innerHTML}</p>`;
    const apiUrl = `https://api.mymemory.translated.net/get?q=${content}&langpair=${distinctLang}|${lang}`;
    if (content){
      this.http.get<any>(apiUrl).subscribe(translatedText => {
        this.editorRef.nativeElement.innerHTML = translatedText?.responseData?.translatedText;
      });
    }
  }

  changeInputLanguage(lang: string) {
    this.currentLangInput = lang;
    const distinctLang = lang === 'ar' ? 'en' : 'ar';
    const content = `<p>${this.inputText}</p>`;
    const apiUrl = `https://api.mymemory.translated.net/get?q=${content}&langpair=${distinctLang}|${lang}`;
    if (content){
      this.http.get<any>(apiUrl).subscribe(translatedText => {
        this.inputText = translatedText?.responseData?.translatedText.replace(/<\/?p>/g, '');
      });
    }
  }
}
