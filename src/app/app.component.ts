import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatIconModule } from '@angular/material/icon';

import {
  ClassicEditor,
  Bold,
  Link,
  List,
  Paragraph,
  Underline,
  ButtonView,
  createDropdown,
  ListItemView,
  ListView
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './components/editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CKEditorModule, FormsModule, MatIconModule, EditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'text-editor';
  lang: string = "en";
  inputText: string = "";
  remainingText: number = 0;
  public Editor = ClassicEditor;
  public config = {
    toolbar: [
      'bold',
      'underline',
      'link',
      'bulletedList',
      'numberedList'
    ],
    plugins: [
      Bold,
      Link,
      List,
      Paragraph,
      Underline
    ],
  }

  americanFlagSVG = `
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32">
                    <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqlJREFUWEftVl1IU2EYfrYm88y16dn8ba5ZRlrOUpDVMBEN6ecipZCiC6GgVqI5dZFd1DKQYFDQH/RHdFPCqOzCgqiwjMokRa3VRcpqQ93Ypptjczp2Yl8YGd2c08Audq4O5/me932+5zy838fDEj+8Je6PuIC4A8SBe63XO2ZCkUK2gdRIveOqpKCfLS+6npcotEj0bTeJAMO+G4H3s1kU20JtQTNK5y1saWR9JF9tl1y+lU0EtB4yT6+v2CAdHHFj3BHA7p0q3O+2IitdhCK1DJ1dY9hbvQpR3Dszh6ryFbj7YAz19CBKJU5uAmQZQ8l6w0YiQHei17a9XKkY+exB36ALplMlMLT3Q1MkhzqfxvlrH9F8uABRfMIZRF1tLo6f7UezLg/aEjknAQwDcyotrSUCGhq6HcN2pIkoAQLBMCm48P63bwkJfLKmqSwMbQ6n/mCEwheyrVWVvzIwQa+hzhiKcdo0gMJ1NLZsyoDRNACjoRi97yYxbPFgAd+1TUm6Lr/SHpsM6A90TlsCydKaHSvx8PE3qLLFyEgToefNBMq1mZh0BmC1+bGAF+SlEAGVnp7YZWAuBMV3ux/z4QjycqX48tWLBAEfSoUYo1YfVqsk+BNvORKjDDQ1PXEcbdSmve5zkF3fuViGusZXZPelmnQ0nHyLSx2bEcWtthm06Aqwv/4ldJpQ7DIwSuVQkQgDfyAMOZ0Il2cWYpEAfD4P7qkQZClCRPH5MIMkSgCHK4iYzYGrx26P26eRyTbPNXIb1lJetrSfg+j3OeCa8pkBZg+nShxJi+aA+9nT57xQqIJjLU60RXPA13jQxv80ouBUiSNp0VkwdcE0tMw9yfo05Ng7ngHiwP+VAZ+x7RE8zuJ/+adsuQyd+kFqPFcdv5TGHYg7sOQO/AAGYT4wfTlV/AAAAABJRU5ErkJggg==" x="0" y="0" width="32" height="32"/>
                  </svg>`;
  arabicSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="20" viewBox="0 0 31 20">
              <image xlink:href="data:image/png;base64,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" x="0" y="0" width="31" height="20"/>
            </svg>`;

  constructor(private http: HttpClient) {}

  onReady(editor: any) {
    this.addTranslateButton(editor);
  }

  addTranslateButton(editor: any) {
    if (editor && editor.ui) {
      editor.ui.componentFactory.add('translateDropdown', (locale: any) => {
        const dropdown = createDropdown(locale);
        dropdown.buttonView.set({
          label: '',
          withText: false,
          class: "custom-translate-btn",
          icon: this.americanFlagSVG
        });

        const listView = new ListView(locale);

        const languages = [
          { label: '', code: 'en' },
          { label: '', code: 'ar' }
        ];

        languages.forEach(language => {
          const listItem = new ListItemView(locale);
          const button = new ButtonView(locale);

          button.set({
            label: '',
            withText: false,
            icon: language.code === 'en' ? this.americanFlagSVG : this.arabicSVG
          });

          button.on('execute', () => {
            // changing flag
            const customTranslateBtn = document.querySelector('.custom-translate-btn') as HTMLElement;
            if (customTranslateBtn) {
              const svgElement = customTranslateBtn.querySelector('svg');
              if (svgElement) {
                svgElement.innerHTML = language.code === 'en' ? this.americanFlagSVG : this.arabicSVG;
              }
            }

            const distinctLang = language.code === 'ar' ? 'en' : 'ar';
            const content = editor.getData();
            const apiUrl = `https://api.mymemory.translated.net/get?q=${content}&langpair=${distinctLang}|${language.code}`;
            if (content) {
              this.http.get<any>(apiUrl).subscribe(translatedText => {
                editor.setData(translatedText?.responseData?.translatedText);
              });
            }
          });

          listItem.children.add(button);
          listView.items.add(listItem);
        });

        dropdown.panelView.children.add(listView);

        return dropdown;
      });

      editor.ui.view.toolbar.items.add(editor.ui.componentFactory.create('translateDropdown'));
    }
  }

  getRemainingCharacters(){
    this.remainingText = 300 - this.inputText.length;
  }

  translationOnInput(language: string) {
    this.lang = language;
    const distinctLang = language === 'ar' ? 'en' : 'ar';
    const content = this.inputText;
    const apiUrl = `https://api.mymemory.translated.net/get?q=${content}&langpair=${distinctLang}|${language}`;
    if (content){
      this.http.get<any>(apiUrl).subscribe(translatedText => {
        this.inputText = translatedText?.responseData?.translatedText;
        this.getRemainingCharacters();
      });
    }
  }
}
