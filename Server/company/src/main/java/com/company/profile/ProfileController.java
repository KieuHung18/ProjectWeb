package com.company.profile;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.company.datasource.CompanyUser;
import com.company.register.JsonResponse;

@Controller
public class ProfileController {
	@RequestMapping(path="/profile",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse login(@RequestParam(value ="userID")String userID) {
		JsonResponse res =new JsonResponse();
		res.setResult("SUCCESS");
		res.setResponse(getUser(userID));
		return res;
		
	}
	public CompanyUser getUser(String userID) {
		CompanyUser res= new CompanyUser();
		return res;
	}
}
