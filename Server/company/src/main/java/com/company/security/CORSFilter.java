package com.company.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class CORSFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpServletResponse httpRespone=(HttpServletResponse)response;
		HttpServletRequest httpRequest=(HttpServletRequest)request;
		
		httpRespone.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		httpRespone.addHeader("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTION");
		httpRespone.addHeader("Access-Control-Allow-Credentials","true");
//		httpRespone.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Auth-Token");
		
//		httpRequest.getCookies();
//		Cookie cookie = new Cookie("JSESSIONID", request.getParameter("JSESSIONID"));
		
//		System.out.println(request.getParameter("JSESSIONID"));
//	    response.addCookie(userCookie);
//		if(httpRequest.getCookies()!=null) {
//			System.out.println("cookie: "+httpRequest.getCookies()[0].getValue());
//		}else {
//			System.out.println("cookie: "+httpRequest.getCookies());
//		}
		
		httpRequest.getSession(true);
//		session.setMaxInactiveInterval(20);
//		System.out.println("session: "+session);
		
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
