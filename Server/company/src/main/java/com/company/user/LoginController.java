package com.company.user;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.company.object.JsonResponse;

@RestController
public class LoginController {
	@Autowired
	JwtService jwtService;
	@Autowired
	UserService userService;
	
	@RequestMapping(path="/protecteduser",method = RequestMethod.GET)
	public void user(HttpServletRequest request) {
//		System.out.println(request.getSession(false).getAttribute("email"));
	}
	
	@RequestMapping(path="/logout",method = RequestMethod.GET)
	public void logout(HttpServletRequest request) {
	}
	
	@RequestMapping(path="/protectedadmin",method = RequestMethod.GET)
	public void admin() {
		System.out.println("protectedadmin");
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
	
	
	@RequestMapping(path="/authorize/{uid}",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse authorize(HttpServletRequest request,@PathVariable(value = "uid")int uid) {
		JsonResponse res =new JsonResponse();
		res.setResult("SUCCESS");
		res.setResponse(jwtService.generateTokenLogin(uid));
		System.out.println("login");
		return res;
	}
}
