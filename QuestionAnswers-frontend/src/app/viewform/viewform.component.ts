import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { QuestionAnswers } from '../QuestionAnswer.interface';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { QuestionAnswerService } from '../app.service';
import { Data } from "../data"
import {Router, NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-viewform',
  templateUrl: './viewform.component.html',
  styleUrls: ['./viewform.component.css']
})
export class ViewformComponent implements OnInit {
  public viewForm: FormGroup;
  
  questionAnswers : QuestionAnswers;

  constructor(private _fb: FormBuilder, private data: Data,private router: Router,private qaService: QuestionAnswerService) { }
  
  
  ngOnInit() {
      this.initializeForm();
      console.log("just question answers array : "+JSON.stringify(this.questionAnswers));

  }

  initializeForm(){
    this.questionAnswers = this.data.storage;

    // use below code if you want to see all the details instead of just the updated QAS.
    

    // if(this.data.storage.contextId == undefined){ // if creating new form , we do not have contextId as this is generated in backend.
    //         this.questionAnswers = this.data.storage;
    // }else{
    //         this.qaService.getQuestionAnswersById(this.data.storage.articleId,this.data.storage.contextId)
    //         .then(questionAnswers => this.questionAnswers = questionAnswers );   
    //       }


  }

   

}

