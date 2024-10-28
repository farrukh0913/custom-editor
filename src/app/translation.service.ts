import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: "root"})

export class TranslationService {
  constructor(private http: HttpClient){}

  /**
   * translate given string
   * @param content text content
   * @param distinctLang previous lang
   * @param language current language
   */
  translate(content: string, distinctLang: string, language: string){
    const apiUrl: string = `https://api.mymemory.translated.net/get?q=${content}&langpair=${distinctLang}|${language}`;
    return this.http.get<any>(apiUrl);
  }

}