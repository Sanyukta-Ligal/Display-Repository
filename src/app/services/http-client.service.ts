import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

const API_BASE_URL = environment.gitRepoUrl;

@Injectable()
export class HttpService {
    constructor(
        private http: HttpClient
    ) { }
    // createHeader(headers: HttpHeaders) {
    //     headers = headers.append('Content-type', 'application/json');
    //     headers = headers.append('requestsource', 'localhost');
    //     return headers;
    // }

    get(url) {
        // let headers = new HttpHeaders();
        // headers = this.createHeader(headers);
        return this.http.get(API_BASE_URL + url, {
        //   headers: headers
        });
      }
}