import { Injectable } from '@angular/core';
import { HttpService } from './http-client.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
const API_BASE_URL = environment.gitRepoUrl;

@Injectable()
export class GitHubApiService {
    constructor(
        private http: HttpService
    ) { }

    searchUsers(term) {
        if (term && term.length > 2) {
            return this.http.get(`/search/users?q=${term}`)
                .pipe(map((response: any) => {
                    console.log("response foruser", response);
                    return response;
                }));
        } else {
            return of([]);
        }
    }

    getRepositories(selectedItem) {
        let url = `/users/${selectedItem}/repos`;
        return this.http.get(`${url}`);
    }
}