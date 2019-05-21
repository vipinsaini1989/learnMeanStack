import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule, MatButtonModule, MatToolbarModule, MatCardModule, MatExpansionModule, MatProgressSpinnerModule, } from "@angular/material";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { HeaderComponent } from './header/header/header.component';
import { PostListComponent } from './post-list/post-list/post-list.component';
import { TestNgComponent } from './example/test-ng/test-ng.component';
import { HttpClientModule } from '@angular/common/http';
import { TemplateDrivenComponent } from './example/template-driven/template-driven.component';
import { ReactiveFormsComponent } from './example/reactive-forms/reactive-forms.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    TestNgComponent,
    TemplateDrivenComponent,
    ReactiveFormsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule { }
