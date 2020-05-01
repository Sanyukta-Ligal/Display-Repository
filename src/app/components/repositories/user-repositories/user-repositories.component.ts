import { Component, OnInit } from '@angular/core';
import { HttpService, GitHubApiService } from '../../../services';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  distinctUntilChanged,
  debounceTime,
  tap,
  switchMap,
  catchError,

} from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-repositories',
  templateUrl: './user-repositories.component.html',
  styleUrls: ['./user-repositories.component.scss']
})
export class UserRepositoriesComponent implements OnInit {
  totalItem: number;
  repositories: any;
  myControl = new FormControl();
  options: any;
  filteredOptions: any;
  selectedItem: any = '';
  user: any;
  searchFailed: boolean;
  providerSearch: boolean;
  p: number = 1;
  image;
  userName: string;
  selectedValue: any;
  repoLists: any;
  filterLists = [{ value: 'All', name: 'All' }, { value: 'Fork', name: 'Fork' }, { value: 'Archived', name: 'Archived' }];
  spinning = true;
  constructor(private _httpClient: HttpService, private _httpGitHubApiService: GitHubApiService, private _router: Router) { }

  ngOnInit(): void {
    let selectedValue = 'tpope';
    this.getRepositories(selectedValue);
  }

  getRepositories(selectedValue: string) {
    this._httpGitHubApiService.getRepositories(selectedValue).subscribe((result: any) => {
      this.repositories = result;
      this.spinning = false;
      this.image = result[0].owner.avatar_url;
      this.userName = result[0].owner.login;
      this.totalItem = result.length;
      this.repoLists = result;
      this._router.navigate(["/repositories/" + `${selectedValue}`]);
    }
    );
  }

  modelValueChange($event) {
    let result;
    let filterBy = $event.toLowerCase();
    if (filterBy == "archived") {
      result = this.repositories.filter(val => val.archived == true);
      this.repositories = result;
    } else if (filterBy == "fork") {
      result = this.repositories.filter(val => val.fork == true);
      this.repositories = result;
    } else {
      this.repositories = this.repoLists;
    }
    this.totalItem = this.repositories.length
  }

  handleClick($event) {
    let selectedValue
    if (this.myControl.value.login) {
      this.spinning = true;
      if (this.myControl.value.login) {
        selectedValue = this.myControl.value.login;
      } else {
        selectedValue = 'tpope';
      }
      this.getRepositories(selectedValue);
    }
  }

  inputFormatterForProvider = (x: { login: string }) => x.login;

  searchUser = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.providerSearch
        = true),
      switchMap(term => {
        if (term.length > 2) {
          return this._httpGitHubApiService.searchUsers(term).pipe(map(a => {
            this.providerSearch = false;
            return a.items;
          }
          ),
            tap(() => this.searchFailed = false),
            catchError(() => {
              this.searchFailed = true;
              this.providerSearch = false;
              return of([]);
            }));
        } else {
          this.providerSearch = false;
          return of([]);
        }
      }
      ),
      tap(() => this.providerSearch = false)
    )

}
