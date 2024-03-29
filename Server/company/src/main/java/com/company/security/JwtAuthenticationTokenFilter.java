package com.company.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.company.entity.CompanyUser;
import com.company.user.JwtService;
import com.company.user.UserService;

public class JwtAuthenticationTokenFilter extends UsernamePasswordAuthenticationFilter{
	
	public final static String TOKEN_HEADER = "authorization";
	@Autowired
	private JwtService jwtService;
	@Autowired
	private UserService service;
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
//	 jwtService = new JwtService();
		// TODO Auto-generated method stub
	 HttpServletRequest httpRequest = (HttpServletRequest) req;
	    String authToken = httpRequest.getHeader(TOKEN_HEADER);
	    if (jwtService.validateTokenLogin(authToken)) {
//	    	System.out.println("token allow");
	      String userid = jwtService.parseJwt(authToken).getBody().getSubject();
	      CompanyUser user = service.getUser(Integer.parseInt(userid));
	      if (user != null) {
//	    	  System.out.println("user allow");
	        boolean enabled = true;
	        boolean accountNonExpired = true;
	        boolean credentialsNonExpired = true;
	        boolean accountNonLocked = true;
	        UserDetails userDetail = new User(user.getName(), user.getPassword(), enabled, accountNonExpired,
	            credentialsNonExpired, accountNonLocked,authorization(user.getRole()));
	        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetail,
	            null, userDetail.getAuthorities());
	        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	      }
	    }
	    chain.doFilter(req, res);
	}
 	private List<GrantedAuthority> authorization(String role) {
		List<GrantedAuthority> authoritys = new ArrayList<>();
		grantedAuths(role, authoritys);
		return authoritys;
	}
 	private void grantedAuths(String role,List<GrantedAuthority> authoritys) {
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
		
		if(role.equals("ROLE_ADMIN")) {
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
}
