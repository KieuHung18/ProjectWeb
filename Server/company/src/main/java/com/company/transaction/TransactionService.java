package com.company.transaction;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.dao.TransactionDAO;
import com.company.entity.CompanyTransaction;
import com.company.entity.CompanyUser;
import com.company.product.ProductService;
import com.company.user.JwtService;
import com.company.user.UserService;

@Service
public class TransactionService {
	@Autowired
	private TransactionDAO transactionDAO;
	@Autowired
	UserService userService;
	@Autowired
	JwtService jwtService;
	@Autowired
	ProductService productService;
	@Transactional
	public void createTransaction(String userToken,int productID) {
		CompanyTransaction transaction= new CompanyTransaction();
		CompanyUser user =userService.getUser(Integer.parseInt(jwtService.parseJwt(userToken).getBody().getSubject()));
		transaction.setUser(user);
		transaction.setProduct(productService.get(productID));
		transaction.setTransactionDate(new Timestamp(System.currentTimeMillis()));
		transactionDAO.create(transaction);
	}
	public List<Transaction> getTransactions() {
		List<Transaction> result = new ArrayList<Transaction>();
		List<CompanyTransaction> transactions=transactionDAO.list();
		for(CompanyTransaction t:transactions) {
			Transaction transaction = new Transaction();
			transaction.setUserName(t.getUser().getName());
			transaction.setProductName(t.getProduct().getName());
			transaction.setTransactionDate(t.getTransactionDate());
			transaction.setPrice(t.getProduct().getPrice());
			transaction.setId(t.getId());
			transaction.setProductID(t.getProduct().getId());
			result.add(transaction);
		}
		return result;
	}
	
	public List<Transaction> getUserTransactions(int userId) {
		List<Transaction> result = new ArrayList<Transaction>();
		List<CompanyTransaction> transactions=transactionDAO.list();
		for(CompanyTransaction t:transactions) {
			if(t.getUser().getId()==userId) {
				Transaction transaction = new Transaction();
				transaction.setUserName(t.getUser().getName());
				transaction.setProductName(t.getProduct().getName());
				transaction.setTransactionDate(t.getTransactionDate());
				transaction.setPrice(t.getProduct().getPrice());
				transaction.setId(t.getId());
				transaction.setProductID(t.getProduct().getId());
				result.add(transaction);
			}
		}
		return result;
	}
}
