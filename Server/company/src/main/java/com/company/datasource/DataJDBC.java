package com.company.datasource;

import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

public abstract class DataJDBC<E> implements DAO<E>{
	protected DataSource dataSource;
	protected JdbcTemplate jdbcTemplateObject;
	@Override
	public void setDataSource(DataSource dataSource) {
		// TODO Auto-generated method stub
		this.dataSource = dataSource;
	    this.jdbcTemplateObject = new JdbcTemplate(dataSource);
	    try {
			dataSource.getConnection();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void create(E element) {
		// TODO Auto-generated method stub
		
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
	public void edit(String key, E element) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public E get(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<E> list() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
