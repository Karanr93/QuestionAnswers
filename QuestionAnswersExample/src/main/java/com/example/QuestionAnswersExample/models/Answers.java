package com.example.QuestionAnswersExample.models;

public class Answers {

	private String text;

    private int answer_start;

    public String getText ()
    {
        return text;
    }

    public void setText (String text)
    {
        this.text = text;
    }

    public int getAnswer_start ()
    {
        return answer_start;
    }

    public void setAnswer_start (int answer_start)
    {
        this.answer_start = answer_start;
    }

	@Override
	public String toString() {
		return "Answers [text=" + text + ", answer_start=" + answer_start + "]";
	}
    
    
}
