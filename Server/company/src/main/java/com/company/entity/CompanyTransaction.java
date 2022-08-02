package com.company.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="CompanyTransaction")
public class CompanyTransaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
	@OneToOne
    @JoinColumn(name = "user_id")
    private CompanyUser user;
	@OneToOne()
    private CompanyProduct product;
	private Timestamp transactionDate;
	public CompanyTransaction() {
		// TODO Auto-generated constructor stub
	}
	public Timestamp getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(Timestamp transactionDate) {
		this.transactionDate = transactionDate;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public CompanyUser getUser() {
		return user;
	}

	public void setUser(CompanyUser user) {
		this.user = user;
	}

	public CompanyProduct getProduct() {
		return product;
	}
	public void setProduct(CompanyProduct product) {
		this.product = product;
	}
}
