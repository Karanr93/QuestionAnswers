import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { QuestionAnswers } from '../QuestionAnswer.interface';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { QuestionAnswerService } from '../app.service';
import { Data } from "../data"
import {Router, NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-qaform',
  templateUrl: './qaform.component.html',
  styleUrls: ['./qaform.component.css']
})
export class QaformComponent implements OnInit {

  public myForm: FormGroup;
  constructor(private _fb: FormBuilder, private data: Data,private router: Router,private qaService: QuestionAnswerService) { }

  ngOnInit() {
      this.initializeForm();
  }

  initializeForm(){
      this.myForm = this._fb.group({
          articleId: [this.data.storage.articleId, [Validators.required, Validators.minLength(5)]],
          context:[this.data.storage.context,[Validators.required,Validators.minLength(5)]],
          qas: this._fb.array([
              this.initQuestionAnswer()
          ])
      });
  }

  initQuestionAnswer() {
      return this._fb.group({
          question: ['', Validators.required],
          answers:this._fb.array([
              this.initAnswers()
          ])

      });
  }

  initAnswers(){
      return this._fb.group({
          text: ['',Validators.required],
          answer_start:[0,Validators.required]
      })
  }

  addQuestionAnswer() {
      const control = <FormArray>this.myForm.controls['qas'];
      control.push(this.initQuestionAnswer());
  }


  addAnswer(index:number){
      (<FormArray>(<FormGroup>(<FormArray>this.myForm.controls['qas'])
    .controls[index]).controls['answers']).push(
      this.initAnswers())
  }

  removeQuestionAnswer(i: number) {
      const control = <FormArray>this.myForm.controls['qas'];
      control.removeAt(i);
  }

  removeAnswer(questionIndex:number, answerIndex:number){
      (<FormArray>(<FormGroup>(<FormArray>this.myForm.controls['qas'])
      .controls[questionIndex]).controls['answers']).removeAt(
        answerIndex)

  }
  
  addNewQuestionAnswer(model: QuestionAnswers) {
      this.qaService.addNewQuestionAnswer(this.data.storage.articleId,this.data.storage.contextId,model);
      this.data.storage = model;
      this.router.navigate(['/view']);
      console.log("addNewQuestionAnswers model : "+model);
  }
}
