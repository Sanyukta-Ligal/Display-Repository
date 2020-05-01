import { Injectable } from '@angular/core';
import { HttpService } from './http-client.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
const API_BASE_URL = environment.gitRepoUrl;
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GitHubApiService {
    constructor(
        private http: HttpService
    ) { }


    searchUsers(term) {
        if (term && term.length > 2) {
            return this.http.get(`/search/users?q=${term}` + "&client_id=991a16711e7ae0843650&client_secret=6bdb59ab3a12c99d8acebea7713466cacf65cfc6")
                .pipe(map((response: any) => {
                    console.log("response foruser", response);
                    return response;
                }),
                    (
                        catchError(this.handleError)
                    ));
        } else {
            return of([]);
        }
    }

    getRepositories(selectedItem) {
        let url = `/users/${selectedItem}/repos` + "?client_id=991a16711e7ae0843650&client_secret=6bdb59ab3a12c99d8acebea7713466cacf65cfc6";
        return this.http.get(`${url}`).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.log('service handle error: ', error);
        if (error.error) {
            return throwError({ status: error.status, message: error.error.message });
        } else {
            return throwError({
                status: 500, success: false,
                message: `Backend returned code ${error.status} body was: ${error.message}`
            })
        }
    }
}