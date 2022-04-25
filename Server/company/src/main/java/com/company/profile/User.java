package com.company.profile;

public class User {
	private String email;
	private String name;
	private Date DOB;
	private boolean gender;
	private String description;
	public User(String email, String name, Date dOB, boolean gender, String description) {
		super();
		this.email = email;
		this.name = name;
		DOB = dOB;
		this.gender = gender;
		this.description = description;
	}
	public User() {
		// TODO Auto-generated constructor stub
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getDOB() {
		return DOB;
	}
	public void setDOB(Date dOB) {
		DOB = dOB;
	}
	public boolean isGender() {
		return gender;
	}
	public void setGender(boolean gender) {
		this.gender = gender;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
