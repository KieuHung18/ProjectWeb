package com.company.register;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RegisterController {
	@RequestMapping(path="/register",method = RequestMethod.POST)
	public void register(@RequestParam(value ="name")String name) {
		
	}
}
