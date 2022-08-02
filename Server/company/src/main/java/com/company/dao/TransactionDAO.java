package com.company.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.company.entity.CompanyTransaction;
import com.company.entity.CompanyUser;

@Repository
public class TransactionDAO implements DAO<CompanyTransaction>{
	@PersistenceContext
    private EntityManager entityManager;
	@Override
	public void create(CompanyTransaction element) {
		entityManager.persist(element);
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
	public void edit(int id, CompanyTransaction element) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public CompanyTransaction get(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CompanyTransaction> list() {
		// TODO Auto-generated method stub
		return entityManager.createQuery("FROM CompanyTransaction", CompanyTransaction.class).getResultList();
	}

}
