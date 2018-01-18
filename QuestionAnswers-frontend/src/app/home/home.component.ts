import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { QuestionAnswers } from '../QuestionAnswer.interface';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { QuestionAnswerService } from '../app.service';
import {Router, NavigationExtras} from "@angular/router";

import { Data } from "../data"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public homeForm : FormGroup;
  showContextListDiv : boolean;
  questionAnswers : QuestionAnswers[];
  constructor(private _fb: FormBuilder,private router: Router,private data: Data,private qaService: QuestionAnswerService) { }

  ngOnInit() {
    this.showContextListDiv = false;
    this.homeForm = this._fb.group({
      articleId: ['', [Validators.required, Validators.minLength(5)]]
  });
  }

  contextList(model: QuestionAnswers){
    this.showContextListDiv = true;
    this.qaService.getContexts(model.articleId)
    .then(questionAnswers => this.questionAnswers = questionAnswers );   
    console.log("List of Contexts I Got "+this.qaService.getContexts(model.articleId));
  }

  addQuestionAnswer(model:QuestionAnswers){
    this.router.navigate(['qa']);
    this.data.storage = model;
  }
  viewQuestionAnswer(model:QuestionAnswers){
    this.router.navigate(['view']);
    this.data.storage = model;
  }
}
