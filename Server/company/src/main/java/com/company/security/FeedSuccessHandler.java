package com.company.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.company.entity.CompanyUser;
import com.company.user.UserService;

public class FeedSuccessHandler implements AuthenticationSuccessHandler{
	@Autowired
	private UserService service;
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
	    CompanyUser user = service.findByEmail(authentication.getPrincipal().toString());
		response.sendRedirect(request.getContextPath()+"/authorize/"+user.getId());
	}

}
