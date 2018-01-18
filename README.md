# QuestionAnswers
Question Answer Form Application That can be used to generate SQuAD like Dataset
Front-end is done using Angular2 
And Backend is done using Springboot integrated with MongoDB.
Once all the data is entered you can aggrgate all the data set using below Query

db.questionAnswers.aggregate([
    {"$group": {"_id" : "$articleId", "paragraphs" : {"$push" : { context: "$context", qas: "$qas" }}}},
    {"$project" : {"title" : "$_id", "paragraphs" : 1,"_id": 0}},
    {"$group" : {"_id" : 0, "data" : {"$push" : "$$CURRENT"}}},
    {"$project" : {"data" : 1,"_id": 0}}
])

 
