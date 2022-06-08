package com.company.security;


import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.company.datasource.CompanyUserJDBC;


@Component
public class SecurityAuthenticationProvider implements AuthenticationProvider
{
		@Override
		public Authentication authenticate(Authentication authentication) throws AuthenticationException
		{
			String email = authentication.getName();
			String password = authentication.getCredentials().toString();
			ApplicationContext context = new ClassPathXmlApplicationContext("data-source-config.xml");
		    CompanyUserJDBC JDBC= (CompanyUserJDBC)context.getBean("companyUserJDBC");
		    boolean authenticate=JDBC.loginValidation(email, password);
		    ((ConfigurableApplicationContext)context).close();
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