package com.company.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.company.entity.CompanyProduct;
import com.company.entity.CompanyUser;

@Repository
public class ProductDAO implements DAO<CompanyProduct>{
	@PersistenceContext
    private EntityManager entityManager;
	@Override
	public void create(CompanyProduct element) {
		// TODO Auto-generated method stub
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
	public void edit(int id, CompanyProduct element) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public CompanyProduct get(int id) {
		// TODO Auto-generated method stub
		return entityManager.find(CompanyProduct.class, id);
	}
	@SuppressWarnings("unchecked")
	public List<CompanyProduct> findByType(String type) {
		return entityManager.createQuery("select p from CompanyProduct p where p.type = :type")
				.setParameter("type", type)
				.getResultList();
	}
	@Override
	public List<CompanyProduct> list() {
		// TODO Auto-generated method stub
		return entityManager.createQuery("FROM CompanyProduct", CompanyProduct.class).getResultList();
	}

}
