package com.example.QuestionAnswersExample.repositories;

 
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.QuestionAnswersExample.models.QuestionAnswers;

 
@Repository
public interface QuestionAnswerRepository extends MongoRepository<QuestionAnswers, String> {
	 
}
