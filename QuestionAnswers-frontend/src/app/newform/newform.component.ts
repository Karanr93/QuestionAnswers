import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { QuestionAnswers } from '../QuestionAnswer.interface';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { QuestionAnswerService } from '../app.service';
import {Router, NavigationExtras} from "@angular/router";
import { Data } from "../data"

@Component({
  selector: 'app-newform',
  templateUrl: './newform.component.html',
  styleUrls: ['./newform.component.css']
})
export class NewformComponent implements OnInit {

  public newForm: FormGroup;
    constructor(private _fb: FormBuilder,private router: Router,private data: Data,private qaService: QuestionAnswerService) { }

    ngOnInit() {
        this.initializeForm();
    }

    initializeForm(){
        this.newForm = this._fb.group({
            articleId: ['', [Validators.required, Validators.minLength(5)]],
            context:['',[Validators.required,Validators.minLength(5)]],
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
        const control = <FormArray>this.newForm.controls['qas'];
        control.push(this.initQuestionAnswer());
    }


    addAnswer(index:number){
        (<FormArray>(<FormGroup>(<FormArray>this.newForm.controls['qas'])
      .controls[index]).controls['answers']).push(
        this.initAnswers())
    }

    removeQuestionAnswer(i: number) {
        const control = <FormArray>this.newForm.controls['qas'];
        control.removeAt(i);
    }

    removeAnswer(questionIndex:number, answerIndex:number){
        (<FormArray>(<FormGroup>(<FormArray>this.newForm.controls['qas'])
        .controls[questionIndex]).controls['answers']).removeAt(
          answerIndex)

    }
    
    save(model: QuestionAnswers) {
        this.qaService.createQuestionAnswer(model);
        this.data.storage = model;
        this.router.navigate(['/view']);
    }

}
