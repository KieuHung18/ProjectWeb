package com.company.register;

public class JsonResponse {
	private String result;
	private Object response;
	public JsonResponse(String result, Object response) {
		super();
		this.result = result;
		this.response = response;
	}
	public JsonResponse() {
		// TODO Auto-generated constructor stub
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public Object getResponse() {
		return response;
	}
	public void setResponse(Object response) {
		this.response = response;
	}
	
}
