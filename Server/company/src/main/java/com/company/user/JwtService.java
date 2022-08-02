package com.company.user;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.InitBinder;

import com.company.entity.CompanyUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.SignatureException;

@Service
public class JwtService {
	@Autowired
	private UserService service;
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
	
	public String generateTokenLogin(int id) {
	    CompanyUser user = service.getUser(id);
		Instant now = Instant.now();
		String jwtToken = Jwts.builder()
		        .claim("name", user.getName())
		        .claim("email", user.getEmail())
		        .setSubject(String.valueOf(user.getId()))
		        .setId(UUID.randomUUID().toString())
		        .setIssuedAt(Date.from(now))
		        .setExpiration(Date.from(now.plus(60*24*5l, ChronoUnit.MINUTES)))
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
