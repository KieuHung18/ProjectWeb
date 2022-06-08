package com.company.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.company.datasource.CompanyUser;
import com.company.datasource.CompanyUserJDBC;

public class FeedSuccessHandler implements AuthenticationSuccessHandler{

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		ApplicationContext context = new ClassPathXmlApplicationContext("data-source-config.xml");
	    CompanyUserJDBC JDBC= (CompanyUserJDBC)context.getBean("companyUserJDBC");
	    CompanyUser user = JDBC.getByEmail(authentication.getPrincipal().toString());
	    ((ConfigurableApplicationContext)context).close();
		response.sendRedirect(request.getContextPath()+"/authorize/"+user.getUserID());
	}

}
