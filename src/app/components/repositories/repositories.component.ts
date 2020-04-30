import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import {
  distinctUntilChanged,
  debounceTime,
  tap,
  switchMap,
  catchError,

} from 'rxjs/operators';




@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
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
  repoLists:any;
  filterLists = [{ value: 'All', name: 'All' }, { value: 'Fork', name: 'Fork' }, { value: 'Archived', name: 'Archived' }];

  constructor(private _httpClient: HttpService) { }

  ngOnInit() {
    let selectedValue = 'tpope';
    this._httpClient.get(selectedValue).subscribe((result: any) => {
      this.repoLists=result;
      this.repositories = result;
      this.image = result[0].owner.avatar_url;
      this.userName = result[0].owner.login;
      console.log("repositories list", this.repositories);
      this.totalItem = result.length;
    }
    );

  }
  selectItem() {

  }
  modelValueChange($event) {
let result;
    console.log("value change on filter ", $event,this.repositories);
    let filterBy = $event.toLowerCase();
    if(filterBy=="archived"){
      result = this.repositories.filter(val => val.archived == true);
      this.repositories=result;
    }else if(filterBy=="fork"){
      result = this.repositories.filter(val => val.fork == true);
      this.repositories=result;
    }else{
      this.repositories=this.repoLists;
    }
    
    
    console.log("filter by results of fork and archived", result,filterBy)
  }


  handleClick($event) {
    let selectedValue
    if ((this.myControl.value.login) || (!this.myControl.value)) {
      if (this.myControl.value.login) {
        selectedValue = this.myControl.value.login;
      } else {
        selectedValue = 'tpope';
      }
      this._httpClient.get(selectedValue).subscribe((result: any) => {
        this.repositories = result;
        this.image = result[0].owner.avatar_url;
        console.log("user names", this.repositories);
        this.userName = result[0].owner.login;
        this.totalItem = result.length;
      }
      );
      console.log("loginnot undefined");
    }
    return
  }

  //   console.log("click on search",this.myControl.value.login,this.myControl.value);
  //   let selectedValue;
  //   (this.myControl.value.login||this.myControl.value!=null)?(selectedValue=this.myControl.value.login):(selectedValue='iambipinpaul');
  //  console.log("selectedvalue",selectedValue);
  // //  return
  //   // if(this.myControl.value){
  //       this._httpClient.get(selectedValue).subscribe((result: any) => {
  //   this.repositories=result;
  //   this.totalItem = result.length;
  // }
  // );

  // }









  // this._httpClient.get().subscribe((result: any) => {
  //   this.repositories=result;
  //   console.log("repositories list",this.repositories);
  //   this.totalItem = result.length;
  // }
  // );


  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // console.log("options for filter",this.options)
    return this.options && this.options.filter(option => option.login.toLowerCase().indexOf(filterValue) === 0);
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
          return this._httpClient.searchUsers(term).pipe(map(a => {
            this.providerSearch = false;
            console.log("res", a);
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
