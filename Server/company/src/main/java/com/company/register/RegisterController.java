package com.company.register;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.company.datasource.CompanyUser;
import com.company.datasource.CompanyUserJDBC;
import com.company.security.Encoder;

@RestController
public class RegisterController {
	@RequestMapping(path="/register",method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse register( @ModelAttribute CompanyUser user){
		
		JsonResponse response= new JsonResponse();
		ApplicationContext context = new ClassPathXmlApplicationContext("data-source-config.xml");
	    CompanyUserJDBC JDBC= (CompanyUserJDBC)context.getBean("companyUserJDBC");
	    String encodePassword=new Encoder().base64Encode(user.getPassword());
	    if(user.getCountry().equals("Country")) {
	    	user.setCountry(null);
	    }
	    user.setPassword(encodePassword);
	    user.setRole("ROLE_USER");
	    user.setBalance(0);
	    user.setActive(true);
	    
	    try {
	    	JDBC.create(user);
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
		}finally {
			((ConfigurableApplicationContext)context).close();
		}
		return response;
	}
	
	
}
