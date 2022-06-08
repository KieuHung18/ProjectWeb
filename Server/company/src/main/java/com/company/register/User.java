package com.company.register;

import java.sql.Date;
public class User {
	private String email;
	private String password;
	private String name;
	private String country;
	private Boolean male;
	private boolean active;
	private Date DOB;
	public User(String email, String password, String name, String country, Boolean male, boolean active, Date dOB) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;
		this.country = country;
		this.male = male;
		this.active = active;
		DOB = dOB;
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

	public Boolean getMale() {
		return male;
	}

	public void setMale(Boolean male) {
		this.male = male;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Date getDOB() {
		return DOB;
	}

	public void setDOB(Date dOB) {
		DOB = dOB;
	}
	
}
