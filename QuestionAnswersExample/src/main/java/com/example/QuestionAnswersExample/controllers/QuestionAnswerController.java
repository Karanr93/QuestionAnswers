package com.example.QuestionAnswersExample.controllers;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuestionAnswersExample.models.Qas;
import com.example.QuestionAnswersExample.models.QuestionAnswers;
import com.example.QuestionAnswersExample.repositories.QuestionAnswerRepository;
  

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class QuestionAnswerController {

	
	private final MongoTemplate mongoTemplate;
	@Autowired
	public QuestionAnswerController(MongoTemplate template) {
		this.mongoTemplate = template;
	}
	
	
	@Autowired
	QuestionAnswerRepository qaRepository;
	
	@PostMapping("/qa")
    public QuestionAnswers createContext(@Valid @RequestBody QuestionAnswers qa) {
		System.out.println(qa);
		UUID idOne = UUID.randomUUID();
		
		// add all the default IDs for Context and Questions if Any
		qa.setContextId(idOne.toString());
		if(qa.getQas() != null) {
			Qas[] qas = qa.getQas();
			for (int i = 0; i < qas.length; i++) {
				UUID randomId = UUID.randomUUID();
				// set Question Id for each question in the request, this should be done in the front-end later
				qas[i].setId(randomId.toString());
			}
			
			qa.setQas(qas);
		}
		
		return qaRepository.save(qa);

    }
	
	
	@PostMapping("/qa/{articleId}/{contextId}")
    public ResponseEntity<QuestionAnswers> createQuestionAnswer(@PathVariable("articleId") String articleId,@PathVariable("contextId") String contextId,@Valid @RequestBody QuestionAnswers qa) {
		
		Query queryTitle = new Query();
		queryTitle.addCriteria(Criteria.where("articleId").is(articleId).and("contextId").is(contextId));
		QuestionAnswers questionAnswers = mongoTemplate.findOne(queryTitle, QuestionAnswers.class);
		
		if(questionAnswers.getQas() == null) {
			Qas[] qas = qa.getQas();
			for (int i = 0; i < qas.length; i++) {
				UUID randomId = UUID.randomUUID();
				// set Question Id for each question in the request, this should be done in the front-end later
				qas[i].setId(randomId.toString());
			}
			mongoTemplate.updateFirst(queryTitle, new Update().set("qas", qas), QuestionAnswers.class);

		}else {
			Qas[] qas = qa.getQas();
			for (int i = 0; i < qas.length; i++) {
				UUID randomId = UUID.randomUUID();
				// set Question Id for each question in the request, this should be done in the front-end later
				qas[i].setId(randomId.toString());
			}
			
			mongoTemplate.updateFirst(queryTitle, new Update().push("qas", qas[0]), QuestionAnswers.class);
		}
		
        QuestionAnswers updateQA = mongoTemplate.findOne(queryTitle, QuestionAnswers.class);		
        return new ResponseEntity<>(updateQA, HttpStatus.OK);

    }
	
	
	@GetMapping(value="/qa/{articleId}/{contextId}")
    public ResponseEntity<QuestionAnswers> getQuestionAnswerById(@PathVariable("articleId") String articleId,@PathVariable("contextId") String contextId) {
		 
 		Query queryTitle = new Query();
		queryTitle.addCriteria(Criteria.where("articleId").is(articleId).and("contextId").is(contextId));
		QuestionAnswers questionAnswers = mongoTemplate.findOne(queryTitle, QuestionAnswers.class);
		 
		if(questionAnswers == null) {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
	      return new ResponseEntity<>(questionAnswers, HttpStatus.OK);
		}

	}
    
		
    @GetMapping(value="/qa/{articleId}")
    public ResponseEntity<List<QuestionAnswers>> getContextsById(@PathVariable("articleId") String articleId) {
		 
		Query queryTitle = new Query();
		queryTitle.addCriteria(Criteria.where("articleId").is(articleId));
		List<QuestionAnswers> questionAnswers = mongoTemplate.find(queryTitle, QuestionAnswers.class);
	
		if(questionAnswers == null) {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
	      return new ResponseEntity<>(questionAnswers, HttpStatus.OK);
		}

	}
        
    
    @PutMapping(value="/qa/{articleId}/{contextId}")
    public ResponseEntity<QuestionAnswers> updateContext(@PathVariable("articleId") String articleId,@PathVariable("contextId") String contextId,
                                           @Valid @RequestBody QuestionAnswers qa) {
    	
		Query queryTitle = new Query();
		queryTitle.addCriteria(Criteria.where("articleId").is(articleId).and("contextId").is(contextId));
		
 		QuestionAnswers questionAnswers = mongoTemplate.findOne(queryTitle, QuestionAnswers.class);
    	
        if(questionAnswers == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        questionAnswers.setContext(qa.getContext()); // need to verify if other fields data is wiped out or not.
        
        mongoTemplate.updateFirst(queryTitle, new Update().set("context", qa.getContext()), QuestionAnswers.class);
        
        QuestionAnswers updateQA = questionAnswers; //qaRepository.save(questionAnswers);
        return new ResponseEntity<>(updateQA, HttpStatus.OK);
		 
    }
    
    @PutMapping(value="/qa/{articleId}/{contextId}/{id}")
    public ResponseEntity<QuestionAnswers> updateQuestionAnswers(@PathVariable("articleId") String articleId,@PathVariable("contextId") String contextId,@PathVariable("id") String id,
                                           @Valid @RequestBody QuestionAnswers qa) {
    	
		Query queryTitle = new Query();
		queryTitle.addCriteria(Criteria.where("articleId").is(articleId).and("contextId").is(contextId));
		QuestionAnswers questionAnswers = mongoTemplate.findOne(queryTitle, QuestionAnswers.class);

        if(questionAnswers == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
		Qas[] qas = questionAnswers.getQas();
		
		for (int i = 0; i < qas.length; i++) {
				String qasId  = qas[i].getId();
				if(qasId.contentEquals(id) ) {
					 qas[i].setQuestion(qa.getQas()[i].getQuestion());
					 qas[i].setAnswers(qa.getQas()[i].getAnswers());
				}
		}
		
		questionAnswers.setQas(qas); // need to verify
		
		mongoTemplate.updateFirst(queryTitle, new Update().set("qas", qas), QuestionAnswers.class);
		
        QuestionAnswers updateQA = questionAnswers;//qaRepository.save(questionAnswers);
        return new ResponseEntity<>(updateQA, HttpStatus.OK);
     }
    
}
