import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatFormFieldModule,MatInputModule }from '@angular/material/';
import {MatDividerModule} from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { NgxPaginationModule } from 'ngx-pagination';
// import { JwPaginationComponent } from 'jw-angular-pagination';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTING } from './app.routing';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

import * as services from './services';


@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    // JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgOptionHighlightModule,
    // MatInputModule ,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    // MatFormFieldModule,
    MatListModule,
    MatSliderModule,
    RouterModule.forRoot(ROUTING, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      useHash: false
      // onSameUrlNavigation: 'reload'
    }),
    BrowserAnimationsModule,
  ],
  providers: [ services.HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
