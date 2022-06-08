package com.company.datasource;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;

import com.company.security.Encoder;

public class CompanyUserJDBC extends DataJDBC<CompanyUser>{
	@Override
	public void create(CompanyUser user) {
		String SQL = "  insert into CompanyUser(uid, DOB, role, email, name, password, country, balance, male, active)"
					+ " values (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
		jdbcTemplateObject.update( SQL, "uid"+list().size(), user.getDOB(), user.getRole(), user.getEmail(), user.getName(), user.getPassword(), 
									user.getCountry(), user.getBalance(), user.isMale(), user.isActive());
	}
//	String query = "INSERT INTO Transaction(transactionDate)
//		      VALUES (CURRENT_TIMESTAMP)";
	@Override
	public void disable() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void enable() {
		// TODO Auto-generated method stub
	}

	@Override
	public void edit(String userID, CompanyUser user) {
		// TODO Auto-generated method stub
	}
	public boolean loginValidation(String email,String password) {
		String encodePassword=new Encoder().base64Encode(password);
		String sql = "select * from CompanyUser where email=? and password=? and active=1";
		try {
			jdbcTemplateObject.queryForObject(sql, new Object[] { email,encodePassword},UserMapper());
		} catch (EmptyResultDataAccessException e) {
			System.out.println("Wrong email or password");
			return false;
		}
		return true;
		
	}
	@Override
	public CompanyUser get(String userID) {
		// TODO Auto-generated method stub
		String sql = "select * from CompanyUser where uid=? and active=1";
		CompanyUser user = null;
		try {
			user = (CompanyUser) jdbcTemplateObject.queryForObject(
		            sql, new Object[] { userID },UserMapper());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}
	
	public CompanyUser getByEmail(String email) {
		// TODO Auto-generated method stub
		String sql = "select * from CompanyUser where email=? and active=1";
		CompanyUser user = null;
		try {
			user = (CompanyUser) jdbcTemplateObject.queryForObject(
		            sql, new Object[] { email },UserMapper());
		} catch (Exception e) {
			System.out.println("Get user by email Exception");
		}
		return user;
	}
	
	@Override
	public List<CompanyUser> list() { 
		String SQL = "select * from CompanyUser where active=1";
		List <CompanyUser> users = jdbcTemplateObject.query(SQL, UserMapper());
		return users;
	}
	private RowMapper<CompanyUser> UserMapper() {
		return new RowMapper<CompanyUser>() {
			@Override
			public CompanyUser mapRow(ResultSet rs, int rowNum) throws SQLException {
				CompanyUser user = new CompanyUser();
				  user.setUserID(rs.getString("uid"));
			      user.setRole(rs.getString("role"));
			      user.setEmail(rs.getString("email"));
			      user.setName(rs.getString("name"));
			      user.setPassword(rs.getString("password"));
			      user.setCountry(rs.getString("country"));
			      user.setBalance(rs.getDouble("balance"));
			      user.setMale(rs.getBoolean("male"));
			      user.setActive(rs.getBoolean("active"));
			      return user;
			}
		};
	}
}
