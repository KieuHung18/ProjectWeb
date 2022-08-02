package com.company.entity;

import java.sql.Date;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="CompanyUser")
public class CompanyUser {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	@Column(name = "role")
	private String role;
	@Column(name = "email")
	private String email;
	@Column(name = "password")
	private String password;
	@Column(name = "name")
	private String name;
	@Column(name = "country")
	private String country;
	@Column(name = "male")
	private Boolean male;
	@Column(name = "active")
	private boolean active;
	@Column(name = "dob")
	private Date dob;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
    private List<CompanyTransaction> transactions;
	public CompanyUser() {
		// TODO Auto-generated constructor stub
	}
	public CompanyUser(int id, String role, String email, String password, String name, String country,
			double balance, Boolean male, boolean active, Date dOB) {
		super();
		this.id = id;
		this.role = role;
		this.email = email;
		this.password = password;
		this.name = name;
		this.country = country;
		this.male = male;
		this.active = active;
		this.dob = dOB;
	}
	
	
	public List<CompanyTransaction> getTransactions() {
		return transactions;
	}
	public void setTransactions(List<CompanyTransaction> transactions) {
		this.transactions = transactions;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public Date getDob() {
		return dob;
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
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "CompanyUser [id=" + id + ", role=" + role + ", email=" + email + ", password=" + password + ", name="
				+ name + ", country=" + country + ", male=" + male + ", active=" + active + ", dob=" + dob + "]";
	}
	
}
