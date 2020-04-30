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
    createHeader(headers: HttpHeaders) {
        // headers = headers.append('Content-Type', 'application/json');
        // headers = headers.append('requestsource', 'localhost');
        return headers;
    }

    get(selectedItem?) {
        // return this.http.get(`&s=${term}&page=${page}&type=${type}`)
        // api.github.com/user/repos?page=3&per_page=10
        // let url='/rubinius/repos';
    //     let itemSelected;
    //    (selectedItem||selectedItem!=null)?(itemSelected=selectedItem):(itemSelected='iambipinpaul');
    //     console.log("itemselected for search",selectedItem);
    //    return
        // let url=`/${itemSelected}/repos`;
        let url='users/rubinius/repos';
        // let headers = new HttpHeaders();
        // headers = this.createHeader(headers);
        return this.http.get(`${API_BASE_URL}${url}`)  
            // headers: headers
        ;
    }

    getPaginatedUsers(p,per_page){
        let url='/tpope/repos';
        return this.http.get(`${API_BASE_URL}${url}?page=${p}&per_page=5}`);
    }

    getUsers(){
        return this.http.get(`${API_BASE_URL}`);
    }
    // api.github.com/search/users?q=iambipin

        searchUsers(term) {
            // let url=`api.github.com/search/users?q=${term}`;
            if (term && term.length > 2) {
              return this.http.get(`${API_BASE_URL}/search/users?q=${term}`)
                .pipe(map((response:any) => {
                    console.log("response foruser",response);
                  return response;
                }));
            } else {
              return of([]);
            }
    }
}