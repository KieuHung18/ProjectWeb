package com.company.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;


@Component
public class SecurityAuthenticationProvider implements AuthenticationProvider
{
		@Override
		public Authentication authenticate(Authentication authentication) throws AuthenticationException
		{
			String email = authentication.getName();
			String password = authentication.getCredentials().toString();
			
			if (authenticationdUser(email, password))
			{
				List<GrantedAuthority> authoritys = new ArrayList<>();
				grantedAuths(email, authoritys);
				Authentication auth = new UsernamePasswordAuthenticationToken(email, password, authoritys);
				return auth;
			}
			else
			{
				throw new AuthenticationCredentialsNotFoundException("Invalid Credentials!");
			}
		}
		private void grantedAuths(String email,List<GrantedAuthority> authoritys) {
			authoritys.add(new GrantedAuthority() {
				/**
				 * 
				 */
				private static final long serialVersionUID = 1L;

				@Override
				public String getAuthority() {
					// TODO Auto-generated method stub
					return "ROLE_USER";
				}
			});
			
			if(email.equals("adminhung@gmail.com")) {
				authoritys.add(new GrantedAuthority() {
					/**
					 * 
					 */
					private static final long serialVersionUID = 1L;

					@Override
					public String getAuthority() {
						// TODO Auto-generated method stub
						return "ROLE_ADMIN";
					}
				});
			}
		}
		private boolean authenticationdUser(String email, String password)
		{
				if("userhung@gmail.com".equals(email) && "123456".equals(password))
					return true;
				if("adminhung@gmail.com".equals(email) && "123456".equals(password))
					return true;
				return false;
		}

		@Override
		public boolean supports(Class<?> authentication)
		{
				return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
		}
}