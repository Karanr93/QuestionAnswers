import { Injectable } from '@angular/core';
import { QuestionAnswers } from './QuestionAnswer.interface';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuestionAnswerService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  createQuestionAnswer(qaData: QuestionAnswers): Promise<QuestionAnswers> {
    return this.http.post(this.baseUrl + '/api/qa/', qaData)
      .toPromise().then(response => response.json() as QuestionAnswers)
      .catch(this.handleError);
  }

  getContexts(articleId:String):  Promise<QuestionAnswers[]>{
    return this.http.get(this.baseUrl+'/api/qa/'+articleId)
    .toPromise().then(response => response.json() as QuestionAnswers[])
    .catch(this.handleError);
    
  }

  getQuestionAnswersById(articleId:String,contextId: String) : Promise<QuestionAnswers>{
    return this.http.get(this.baseUrl+'/api/qa/'+articleId+'/'+contextId)
    .toPromise().then(response => response.json() as QuestionAnswers)
    .catch(this.handleError);
  }
  
  addNewQuestionAnswer(articleId : String, contextId : String,qaData:QuestionAnswers) : Promise<QuestionAnswers>{
    return this.http.post(this.baseUrl + '/api/qa/'+articleId+'/'+contextId, qaData)
    .toPromise().then(response => response.json() as QuestionAnswers)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}