package com.company.security;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class FeedSuccessHandler implements AuthenticationSuccessHandler{

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		String email = request.getParameter("email");
		System.out.println(email);
//		SavedRequest savedRequest = new HttpSessionRequestCache().getRequest(request, response);
//        if(savedRequest != null) {
//            response.sendRedirect(savedRequest.getRedirectUrl());
//        }else{
//            response.sendRedirect(request.getContextPath()+"/");
//        }
//    }
		request.getSession(false).setAttribute("email", email);
		//save message in session
//		request.setAttribute("email", email);
		response.sendRedirect(request.getContextPath()+"/authorize");
		// TODO Auto-generated method stub
		
	}

}
