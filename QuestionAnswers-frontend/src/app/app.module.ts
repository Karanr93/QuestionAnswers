import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { QuestionAnswerService } from './app.service';
import { routing }        from './app.routing';
import { AppComponent }   from './app.component';
import { HomeComponent } from './home/home.component';
import { QaformComponent } from './qaform/qaform.component';
import { Data } from "./data";
import { ViewformComponent } from './viewform/viewform.component';
import { NewformComponent } from './newform/newform.component'

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule , HttpModule,routing],
  providers: [QuestionAnswerService,Data],
  declarations: [ AppComponent, HomeComponent, QaformComponent, ViewformComponent, NewformComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }