import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services';
import {FormControl} from '@angular/forms';
import {Observable,of} from 'rxjs';
import {map, startWith,filter} from 'rxjs/operators';
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
  repositories:any;
  myControl = new FormControl();
  options:any;
  filteredOptions: any;
  selectedItem:any='';
  user:any;
  searchFailed:boolean;
  providerSearch:boolean;
  p:number=1;

  constructor(private _httpClient: HttpService) { }

  ngOnInit() {
    // let term='iambi';
    // this._httpClient.searchUsers(term).subscribe(res=>
    //   console.log("res",res)

    // )
    // this._httpClient.getUsers().subscribe(res=>
    //   {
    //     this.options=res;
    //     // this.filterValue();
    //   });

    //    this._httpClient.get().subscribe((result: any) => {
    //   this.repositories=result;
    //   console.log("repositories list",this.repositories);
    //   this.totalItem = result.length;
    // }
    // );
      
      this.filterValue();
      // this.filteredOptions = this.myControl.valueChanges
      // .pipe(
      //   startWith(''),
      //   map(value => this._filter(value))
      // );
        // console.log("res for user lists",res)
      }
      selectItem(){

      }
      ngOnChanges(){
        if( this.myControl.valueChanges){
          console.log("filter on change",this.myControl.value)
        }
       
       
        this.filterValue();
      }
      getPosts(value){
        this.selectedItem=value;
        console.log("option selected value",value)
      }

      handleClick($event){
        console.log("click on search",this.myControl.value);
        let selectedValue;
        (this.myControl.value||this.myControl.value!=null)?(selectedValue=this.myControl.value):(selectedValue='iambipinpaul');
       
        // if(this.myControl.value){
          this._httpClient.get(selectedValue).subscribe((result: any) => {
      this.repositories=result;
      console.log("repositories list",this.repositories);
      this.totalItem = result.length;
    }
    );

        // }
        console.log("event",$event);
      }
  
     
      
      

     
      
     

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



  // goToPage(page) {
  //   // api.github.com/user/repos?page=3&per_page=10
  //   this.p = 2;
  //   this.per_page = 10;
  //   this._httpClient.get(this.p, this.per_page).subscribe(result =>
  //     console.log("result for pagination", result))
  //   // if (this.isBrowser) {
  //   //   document.getElementById('el2_search').scrollIntoView({ behavior: 'smooth' });
  //   // }
  // }

  filterValue(){
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    console.log("filtered options",this.filteredOptions,this.myControl)
  }

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
            console.log("res",a);
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
