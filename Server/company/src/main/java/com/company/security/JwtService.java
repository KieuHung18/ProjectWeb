package com.company.security;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.company.datasource.CompanyUser;
import com.company.datasource.CompanyUserJDBC;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.SignatureException;

@Service
public class JwtService {
	String secret = "asdfSFS34wfsdfsdfSDSD32dfsddDDerQSNCK34SOWEK5354fdgdf4";
	Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret), 
	                            SignatureAlgorithm.HS256.getJcaName());
	public Jws<Claims> parseJwt(String jwtString) {
	    Jws<Claims> jwt = Jwts.parserBuilder()
	            .setSigningKey(hmacKey)
	            .build()
	            .parseClaimsJws(jwtString);
	    return jwt;
	}
	public String generateTokenLogin(String uid) {
		ApplicationContext context = new ClassPathXmlApplicationContext("data-source-config.xml");
	    CompanyUserJDBC JDBC= (CompanyUserJDBC)context.getBean("companyUserJDBC");
	    CompanyUser user = JDBC.get(uid);
	    ((ConfigurableApplicationContext)context).close();
		
		Instant now = Instant.now();
		String jwtToken = Jwts.builder()
		        .claim("name", user.getName())
		        .claim("email", user.getEmail())
		        .setSubject(user.getUserID())
		        .setId(UUID.randomUUID().toString())
		        .setIssuedAt(Date.from(now))
		        .setExpiration(Date.from(now.plus(5l, ChronoUnit.MINUTES)))
		        .signWith(hmacKey)
		        .compact();
		return jwtToken;
	}
	
	public Boolean validateTokenLogin(String token) {
		if(token==null||token.equals("null")) {return false;}
		try {
			parseJwt(token);
		} catch (ExpiredJwtException | SignatureException e) {
			System.out.println("Expried or Wrong signature");
			return false;
		}
	    return true;
	}
}
