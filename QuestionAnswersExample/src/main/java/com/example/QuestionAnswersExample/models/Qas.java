package com.example.QuestionAnswersExample.models;

import java.util.Arrays;

public class Qas {
	
	private String id;

    private Answers[] answers;

    private String question;

    public String getId ()
    {
        return id;
    }

    public void setId (String id)
    {
        this.id = id;
    }

    public Answers[] getAnswers ()
    {
        return answers;
    }

    public void setAnswers (Answers[] answers)
    {
        this.answers = answers;
    }

    public String getQuestion ()
    {
        return question;
    }

    public void setQuestion (String question)
    {
        this.question = question;
    }

	@Override
	public String toString() {
		return "Qas [id=" + id + ", answers=" + Arrays.toString(answers) + ", question=" + question + "]";
	}

    
}
