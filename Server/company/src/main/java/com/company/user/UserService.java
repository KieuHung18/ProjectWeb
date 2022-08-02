package com.company.user;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.dao.UserDAO;
import com.company.entity.CompanyTransaction;
import com.company.entity.CompanyUser;
import com.company.security.Encoder;
import com.company.transaction.Transaction;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserDAO userDAO;
	public List<CompanyUser> list() {
		return userDAO.list();
	}
	public CompanyUser findByEmail(String email){
		return userDAO.findByEmail(email);
	}
	public CompanyUser getUser(int id){
		return userDAO.get(id);
	}
	public void register(CompanyUser user) {
		userDAO.create(user);
	}
	public boolean loginValidation(String email, String password) {
		// TODO Auto-generated method stub
		return userDAO.loginValidation(email, password);
	}
	public void updateUser(int id, CompanyUser user) {
		//userrole,userpass
		CompanyUser companyUser = userDAO.get(id);
		companyUser.setName(user.getName());
		companyUser.setEmail(companyUser.getEmail());
		companyUser.setCountry(user.getCountry());
		companyUser.setDob(user.getDob());
		companyUser.setMale(user.isMale());
		if(user.getPassword()!=null) {
			companyUser.setPassword(new Encoder().base64Encode(user.getPassword()));;
		}
	}
	public List<Transaction> getTransaction(CompanyUser user) {
		List<Transaction> result = new ArrayList<Transaction>();
		List<CompanyTransaction> transactions=user.getTransactions();
		for(CompanyTransaction t:transactions) {
			Transaction transaction = new Transaction();
			transaction.setUserName(t.getUser().getName());
			transaction.setProductName(t.getProduct().getName());
			transaction.setTransactionDate(t.getTransactionDate());
			transaction.setPrice(t.getProduct().getPrice());
			transaction.setProductID(t.getProduct().getId());
			result.add(transaction);
		}
		return result;
	}
	
}
