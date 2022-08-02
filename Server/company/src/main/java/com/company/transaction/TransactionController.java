package com.company.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.company.object.JsonResponse;

@RestController
public class TransactionController {
	@Autowired
	TransactionService transactionService;
	@RequestMapping(path="/purchase",method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse purchase(@RequestParam(value ="token")String token,@RequestParam(value ="productId")int productId){
		JsonResponse response= new JsonResponse();
	    try {
	    	transactionService.createTransaction(token,productId);
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
			e.printStackTrace();
		}
		return response;
	}
	@RequestMapping(path="/transactions",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse getTransactions(){
		JsonResponse response= new JsonResponse();
	    try {
	    	response.setResponse(transactionService.getTransactions());
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
			e.printStackTrace();
		}
		return response;
	}
	
	@RequestMapping(path="/transactions/{id}",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse getUserTransactions(@PathVariable(value = "id")int userId){
		JsonResponse response= new JsonResponse();
	    try {
	    	response.setResponse(transactionService.getUserTransactions(userId));
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
			e.printStackTrace();
		}
		return response;
	}
}
