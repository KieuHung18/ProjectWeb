package com.company.user;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.company.entity.CompanyUser;
import com.company.object.JsonResponse;
import com.company.security.Encoder;

@RestController
public class UserManagerController {
	@Autowired
	JwtService jwtService;
	@Autowired
	UserService userService;
	@RequestMapping(path="/profile",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse profile(@RequestParam(value ="token")String token) {
		JsonResponse res =new JsonResponse();
		res.setResult("SUCCESS");
		CompanyUser user =userService.getUser(Integer.parseInt(jwtService.parseJwt(token).getBody().getSubject()));
		res.setResponse(user);
		return res;
	}
	@RequestMapping(path="/users/{id}",method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse editUser(@PathVariable(value = "id")String id,@ModelAttribute CompanyUser user) {
		JsonResponse res =new JsonResponse();
		res.setResult("SUCCESS");
		userService.updateUser(Integer.parseInt(id),user);
		return res;
	}
	@RequestMapping(path="/users/transactions",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse getTransaction(@RequestParam(value ="token")String token) {
		JsonResponse res =new JsonResponse();
		res.setResult("SUCCESS");
		CompanyUser user =userService.getUser(Integer.parseInt(jwtService.parseJwt(token).getBody().getSubject()));
		res.setResponse(userService.getTransaction(user));
		return res;
	}
	
	@RequestMapping(path="/register",method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse register( @ModelAttribute CompanyUser user){
		
		JsonResponse response= new JsonResponse();
	    String encodePassword=new Encoder().base64Encode(user.getPassword());
	    if(user.getCountry().equals("Country")) {
	    	user.setCountry(null);
	    }
	    user.setPassword(encodePassword);
	    user.setRole("ROLE_USER");
	    user.setActive(true);
	    try {
	    	userService.register(user);
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
		}
		return response;
	}
	
	
	@RequestMapping(path="/users",method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse addUser( @ModelAttribute CompanyUser user){
		
		JsonResponse response= new JsonResponse();
	    String encodePassword=new Encoder().base64Encode(user.getPassword());
	    if(user.getCountry().equals("Country")) {
	    	user.setCountry(null);
	    }
	    user.setPassword(encodePassword);
	    user.setRole("ROLE_ADMIN");
	    user.setActive(true);
	    try {
	    	userService.register(user);
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
		}
		return response;
	}
	
	@RequestMapping(path="/users",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse listUser() {
		JsonResponse res =new JsonResponse();
		res.setResponse(userService.list());
		res.setResult("SUCCESS");
		return res;
		
	}
	
}
