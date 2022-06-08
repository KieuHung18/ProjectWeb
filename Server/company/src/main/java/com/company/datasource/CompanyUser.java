package com.company.datasource;

import java.sql.Date;

public class CompanyUser {
	private String userID;
	private String role;
	private String email;
	private String password;
	private String name;
	private String country;
	private double balance;
	private Boolean male;
	private boolean active;
	private Date DOB;
	
	public CompanyUser() {
		// TODO Auto-generated constructor stub
	}

	public CompanyUser(String userID, String role, String email, String password, String name, String country,
			double balance, Boolean male, boolean active, Date dOB) {
		super();
		this.userID = userID;
		this.role = role;
		this.email = email;
		this.password = password;
		this.name = name;
		this.country = country;
		this.balance = balance;
		this.male = male;
		this.active = active;
		DOB = dOB;
	}
	
	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public Date getDOB() {
		return DOB;
	}

	public void setDOB(Date dOB) {
		DOB = dOB;
	}

	public Boolean getMale() {
		return male;
	}

	public Boolean isMale() {
		return male;
	}

	public void setMale(Boolean male) {
		this.male = male;
	}

	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	
}
