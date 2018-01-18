export class Answers{
    text:string;
    answer_start:number;
}

export class Qas{

    id:string;
    question:string;
    answers:Answers[];
}
export class QuestionAnswers{
    articleId:string;
    context:string;
    contextId:string;
    qas : Qas[];
}