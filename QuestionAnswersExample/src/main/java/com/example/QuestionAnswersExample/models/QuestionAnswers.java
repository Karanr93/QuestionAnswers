package com.example.QuestionAnswersExample.models;

import java.util.Arrays;

public class QuestionAnswers {

	private String contextId;

	private String articleId;

    private Qas[] qas;

    private String context;


     

    public String getContextId() {
		return contextId;
	}

	public void setContextId(String contextId) {
		this.contextId = contextId;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public Qas[] getQas ()
    {
        return qas;
    }

    public void setQas (Qas[] qas)
    {
        this.qas = qas;
    }

    public String getArticleId ()
    {
        return articleId;
    }

    public void setArticleId (String articleId)
    {
        this.articleId = articleId;
    }

	@Override
	public String toString() {
		return "QuestionAnswers [contextId=" + contextId + ", articleId=" + articleId + ", qas=" + Arrays.toString(qas)
				+ ", context=" + context + "]";
	}

	 
    
    
}
