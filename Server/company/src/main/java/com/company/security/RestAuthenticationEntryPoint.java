package com.company.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint{

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		// TODO Auto-generated method stub
		if(request.getMethod().equals("OPTIONS")) {System.out.println(request.getMethod());
			response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write("ok");
		    System.out.println(HttpServletResponse.SC_OK+": "+"ok");
		}
		else {
			System.out.println(request.getMethod());
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		    response.getWriter().write("Unauthorized");
		    System.out.println(HttpServletResponse.SC_UNAUTHORIZED+": "+"Unauthorized");
		}
//		
	}

}
