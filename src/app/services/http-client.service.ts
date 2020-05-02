import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const API_BASE_URL = environment.gitRepoUrl;

@Injectable()
export class HttpService {
    constructor(
        private http: HttpClient
    ) { }

    get(url) {
        return this.http.get(API_BASE_URL + url);
      }
}