package com.company.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.company.entity.CompanyUser;
import com.company.security.Encoder;

@Repository
public class UserDAO implements DAO<CompanyUser>{
	@PersistenceContext
    private EntityManager entityManager;
	
	@Override
	public void create(CompanyUser user) {
		entityManager.persist(user);
	}

	@Override
	public void disable() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void enable() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void edit(int id, CompanyUser element) {
		CompanyUser user = entityManager.find(CompanyUser.class, id);
		user=element;
	}

	@Override
	public CompanyUser get(int id) {
		// TODO Auto-generated method stub
		return entityManager.find(CompanyUser.class, id);
		
	}
	
	public CompanyUser findByEmail(String email){
		return (CompanyUser) entityManager.createQuery("select u from CompanyUser u where u.email = :email")
				.setParameter("email", email)
				.getSingleResult();
	}
	
	@Override
	public List<CompanyUser> list() {
		// TODO Auto-generated method stub
		return entityManager.createQuery("FROM CompanyUser", CompanyUser.class).getResultList();
	}

	public boolean loginValidation(String email, String password) {
		password=new Encoder().base64Encode(password);
		try {
			CompanyUser user = (CompanyUser) entityManager.createQuery("select u from CompanyUser u where u.email = :email AND u.password = :password")
					.setParameter("email", email)
					.setParameter("password", password).getSingleResult();
		} catch (Exception e) {
			System.out.println("loginvalidation gone wrong");
			return false;
			// TODO: handle exception
		}
		return true;
	}
}
