package com.company.login;

public class Authorize {
	private String userID;
	private String userRole;
	public Authorize(String userID, String userRole) {
		super();
		this.userID = userID;
		this.userRole = userRole;
	}
	public Authorize() {
		// TODO Auto-generated constructor stub
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
}
