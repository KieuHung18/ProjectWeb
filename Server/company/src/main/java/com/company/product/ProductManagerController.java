package com.company.product;

import java.io.Console;
import java.util.List;

import org.jboss.logging.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.company.entity.CompanyProduct;
import com.company.object.JsonResponse;

@RestController
public class ProductManagerController {
	@Autowired
	private ProductService productService;
	
	@RequestMapping(path="/products",method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse addProduct( @ModelAttribute CompanyProduct product){
		JsonResponse response= new JsonResponse();
	    try {
	    	product.setActive(true);
	    	productService.save(product);
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
			e.printStackTrace();
		}
		return response;
	}
	@RequestMapping(path="/products/{id}",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse find(@PathVariable(value = "id")int id){
		JsonResponse response= new JsonResponse();
	    try {
	    	response.setResponse(productService.get(id));
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
			e.printStackTrace();
		}
		return response;
	}
	
	@RequestMapping(path="/products/{id}",method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse editProduct( @ModelAttribute CompanyProduct product,@PathVariable(value = "id")int id){
		JsonResponse response= new JsonResponse();
	    try {
	    	productService.edit(product,id);
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
			e.printStackTrace();
		}
		return response;
	}
	
	@RequestMapping(path="/products",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse findByType(@RequestParam(value="type")String type){
		JsonResponse response= new JsonResponse();
	    try {
	    	response.setResponse(productService.findByType(type));
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
			e.printStackTrace();
		}
		return response;
	}
	
	@RequestMapping(path="/products/search",method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse search(@RequestParam(value="search")String search){
		JsonResponse response= new JsonResponse();
	    try {
	    	response.setResponse(productService.search(search));
	    	response.setResult("SUCCESS");
		} catch (Exception e) {
			response.setResult("FAIL");
			e.printStackTrace();
		}
		return response;
	}
	
	@RequestMapping(path="/wishlist",method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse getWishList(@RequestParam(value="wishList") String wishList,@RequestParam(value="token") String token){
		JsonResponse response= new JsonResponse();
		try {
			if(!wishList.equals("")){
				response.setResponse(productService.getWishList(wishList,token));
		    	response.setResult("SUCCESS");
			}else {
				response.setResult("FAIL");
			}
		} catch (Exception e) {
			response.setResult("FAIL");
			e.printStackTrace();
		}
		return response;
	}
	
	
}
