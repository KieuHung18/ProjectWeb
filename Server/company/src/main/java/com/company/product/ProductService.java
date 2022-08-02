package com.company.product;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.dao.ProductDAO;
import com.company.entity.CompanyProduct;
import com.company.entity.CompanyUser;
import com.company.transaction.Transaction;
import com.company.transaction.TransactionService;
import com.company.user.JwtService;

@Service
@Transactional
public class ProductService {
	@Autowired
	private ProductDAO productDAO;
	@Autowired
	private TransactionService transactionService;
	@Autowired
	private JwtService jwtService;
	public void save(CompanyProduct product) {
		productDAO.create(product);
		String folder="D:\\ProjectWeb\\Client\\company\\public\\assets\\images\\product\\";
		try {
			fileCopy(folder+(new Random().nextInt(40)+1)+".png", folder+product.getId()+".png", false);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public List<CompanyProduct> findByType(String type) {
		if(type.equals("All")) {
			return productDAO.list();
		}else {
			return productDAO.findByType(type);
		}
		
	}
	public CompanyProduct get(int id) {
		// TODO Auto-generated method stub
		return productDAO.get(id);
	}
	public List<CompanyProduct> getWishList(String list,String token) {
		List<CompanyProduct> result = new ArrayList<CompanyProduct>();
		String[] listId=list.split(",");		
		if(token.equals("")) {
			for(int i=0;i<listId.length;i++) {
				result.add(productDAO.get(Integer.parseInt(listId[i])));
			}
		}else {
			int userId = Integer.parseInt(jwtService.parseJwt(token).getBody().getSubject());
			List<Transaction> transactionList=transactionService.getUserTransactions(userId);
			for(int i=0;i<listId.length;i++) {
				if(!checkContain(Integer.parseInt(listId[i]), transactionList)) {
					result.add(productDAO.get(Integer.parseInt(listId[i])));
				}
			}
		}
		
			return result;
	}
	private boolean checkContain(int productId,List<Transaction> transactionList) {
		for(int i=0;i<transactionList.size();i++) {
			if(transactionList.get(i).getProductID()==productId) {
				return true;
			}
		}
		return false;
	}
	public List<CompanyProduct> search(String search) {
		List<CompanyProduct> result = new ArrayList<CompanyProduct>();
		List<CompanyProduct> list =productDAO.list();
		for(CompanyProduct c: list) {
			if(search!=""&&c.getName().toUpperCase().contains(search.toUpperCase())) {
				result.add(c);
			}
		}
		return result;
		
	}
	public void edit(CompanyProduct product,int id) {
		CompanyProduct companyProduct= productDAO.get(id);
//		companyProduct.setActive(product.isActive());
		companyProduct.setDescription(product.getDescription());
		companyProduct.setIntro(product.getIntro());
		companyProduct.setName(product.getName());
		companyProduct.setPrice(product.getPrice());
		companyProduct.setType(product.getType());
		
	}
	public static void fileCopy(String sFile, String destFile, boolean moved) throws IOException{
		File source =new File(sFile);
		byte[]array=new byte[(int)source.length()];
		FileInputStream fis =new FileInputStream(source);
		BufferedInputStream bis =new BufferedInputStream(fis);
		bis.read(array);
		bis.close();
		fis.close();
		
		File destination =new File(destFile);
		if(!destination.exists()) {
			destination.createNewFile();
		}
		FileOutputStream fos =new FileOutputStream(destination);
		BufferedOutputStream bos =new BufferedOutputStream(fos);
		bos.write(array);
		bos.close();
		fos.close();
		if(moved) {source.delete();}
	}
	
}	