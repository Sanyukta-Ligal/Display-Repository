import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';






@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
  

  constructor(private _router:Router
 ) { }

  ngOnInit() {
    let selectedValue = 'tpope';
    this._router.navigate(["/repositories/" + selectedValue])
  }
 
}
