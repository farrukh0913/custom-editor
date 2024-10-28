import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: "root"})

export class TranslationService {
  constructor(private http: HttpClient){}

  testMethod(){
    return 'test123'
  }

  translate(content: string, distinctLang: string, language: string){
    const apiUrl: string = `https://api.mymemory.translated.net/get?q=${content}&langpair=${distinctLang}|${language}`;
    return this.http.get<any>(apiUrl);
  }

}