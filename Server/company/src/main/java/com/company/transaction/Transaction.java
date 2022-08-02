package com.company.transaction;

import java.sql.Timestamp;

public class Transaction {
	private int id;
	private String userName;
	private String productName;
	private Timestamp transactionDate;
	private double price;
	private int productID;
	public Transaction() {
		// TODO Auto-generated constructor stub
	}
	public String getUserName() {
		return userName;
	}
	public int getProductID() {
		return productID;
	}
	public void setProductID(int productID) {
		this.productID = productID;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Timestamp getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(Timestamp transactionDate) {
		this.transactionDate = transactionDate;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getId() {
		return id;
	}
	
}
