import { Component, OnInit } from '@angular/core';
import { GitHubApiService } from '../../../services';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  distinctUntilChanged,
  debounceTime,
  tap,
  switchMap,
  catchError,
} from 'rxjs/operators';

@Component({
  selector: 'app-user-repositories',
  templateUrl: './user-repositories.component.html',
  styleUrls: ['./user-repositories.component.scss']
})
export class UserRepositoriesComponent implements OnInit {
  totalItem: number;
  repositories: [];
  myControl = new FormControl();
  searchedUser: string;
  userSearch: boolean;
  image: string;
  userName: string;
  p: number = 1;
  repoLists: any;
  forFilter: boolean;
  filterBy: string;
  filterLists = [{ value: 'All', name: 'All' }, { value: 'Fork', name: 'Fork' }, { value: 'Archived', name: 'Archived' }];
  spinning: boolean = true;
  constructor(private _httpGitHubApiService: GitHubApiService, private _router: Router) { }

  ngOnInit() {
    let searchedUser = 'tpope';
    this.getRepositories(searchedUser);
  }

  modelValueChange($event) {
    let filteredRepositories;
    if ($event.toLowerCase() == "archived") {
      filteredRepositories = this.repoLists.filter(val => val.archived == true);
      this.repositories = filteredRepositories;
    } else if ($event.toLowerCase() == "fork") {
      filteredRepositories = this.repoLists.filter(val => val.fork == true);
      this.repositories = filteredRepositories;
    } else {
      this.repositories = this.repoLists;
    }
    this.forFilter = true;
    this.totalItem = this.repositories.length;
  }

  search() {
    if (this.myControl.value.login) {
      let searchedUser;

      this.forFilter = false;
      this.spinning = true;
      if (this.myControl.value.login) {
        searchedUser = this.myControl.value.login;
      } else {
        searchedUser = 'tpope';
      }
      this.getRepositories(searchedUser);
    }
  }

  inputFormatterForUser = (x: { login: string }) => x.login;

  loadUsers = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.userSearch
        = true),
      switchMap(term => {
        if (term.length > 2) {
          return this._httpGitHubApiService.searchUsers(term).pipe(map(a => {
            this.userSearch = false;
            return a.items;
          }
          ),
            catchError(() => {
              this.userSearch
                = false;
              return of([]);
            }));
        } else {
          this.userSearch
            = false;
          return of([]);
        }
      }
      ),
      tap(() => this.userSearch = false)
    )

  getRepositories(searchedUser: string) {
    this._httpGitHubApiService.getRepositories(searchedUser).subscribe((result: any) => {
      this.repositories = result;
      this.repoLists = [... this.repositories];
      this.spinning = false;
      if (result && result.length > 0) {
        this.filterBy = "All";
        this.totalItem = result.length;
      } else {
        this.filterBy = '';
      }
      this._router.navigate(["/repositories/" + `${searchedUser}`]);
      if (this.myControl.value && this.myControl.value.login) {
        this.image = this.myControl.value.avatar_url;
        this.userName = this.myControl.value.login;
      } else if (result && result.length > 0) {
        this.image = result[0].owner.avatar_url;
        this.userName = result[0].owner.login;
      }
    });
  }
}
