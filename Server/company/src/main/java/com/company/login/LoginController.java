package com.company.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.company.register.JsonResponse;

@Controller
public class LoginController {
	
//	@RequestMapping(path="/login",method = RequestMethod.GET)
//	public void success() {
//		System.out.println("fail");
//	}
//	
//	@RequestMapping(path="/denied",method = RequestMethod.GET)
//	public void fail(HttpServletRequest request) {

//	}
	@RequestMapping(path="/protecteduser",method = RequestMethod.GET)
	public void user() {
		System.out.println("user");
	}
	@RequestMapping(path="/protectedadmin",method = RequestMethod.GET)
	public void admin() {
		System.out.println("admin");
	}
	
	@RequestMapping(path="/denied",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse denied() {
		JsonResponse res =new JsonResponse();
		res.setResult("FAIL");
		res.setResponse("FAIL");
		System.out.println("denied");
		return res;
	}
	
	@RequestMapping(path="/authorize",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse authorize(HttpServletRequest request) {
		String email = (String) request.getSession(false).getAttribute("email");
		request.getSession(false).removeAttribute("email");
		
		JsonResponse res =new JsonResponse();
		res.setResult("SUCCESS");
		res.setResponse(provideAuthorize(email));
		System.out.println("login");
		return res;
	}
	public Authorize provideAuthorize(String email) {
		if(email.equals("adminhung@gmail.com")) {
			return new Authorize("u0","ROLE_ADMIN");
		}
		else {
			return new Authorize("u0","ROLE_USER");
		}
		
	}
	
	
}
