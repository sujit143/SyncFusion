import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    url: string = "https://c4bcf958.ngrok.io/api/Patient";
    constructor(private _http:HttpClient) { }

    getAllData() {
      return this._http.get(this.url);
    }
  }
