import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTING } from './app.routing';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar'; 

import * as services from './services';
import { UserRepositoriesComponent } from './components/repositories/user-repositories/user-repositories.component';


@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    UserRepositoriesComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgOptionHighlightModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    NgxPaginationModule,
    RouterModule.forRoot(ROUTING, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      useHash: false
    }),
    BrowserAnimationsModule,
  ],
  providers: [ services.HttpService,
  services.GitHubApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
