package com.company.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.company.user.UserService;



@Component
public class SecurityAuthenticationProvider implements AuthenticationProvider
{	@Autowired
	private UserService service;
		@Override
		public Authentication authenticate(Authentication authentication) throws AuthenticationException
		{
			String email = authentication.getName();
			String password = authentication.getCredentials().toString();
		    boolean authenticate=service.loginValidation(email, password);
			if (authenticate)
			{
				Authentication auth = new UsernamePasswordAuthenticationToken(email, password);
				return auth;
			}
			else
			{
				throw new AuthenticationCredentialsNotFoundException("Invalid Credentials!");
			}
		}
		@Override
		public boolean supports(Class<?> authentication)
		{
				return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
		}
}