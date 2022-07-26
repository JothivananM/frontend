package com.SpringBoot.Demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class frontendController {
	
	@RequestMapping("/*")
	public String sidebarPage(){
		return "index";
	}
	

	@RequestMapping("/templates/indexContent.html")
	public String showIndexContent(){
		return "indexContent";
	}

	@RequestMapping("/templates/Admin-Panel.html")
	public String about(){
		return "Admin-Panel";
	}
	
	@RequestMapping("/templates/Employee-Panel.html")
	public String index1(){
		return "Employee-Panel";
	}

	@RequestMapping("/login")
	public String showLogin(){
		return "Login";
	}

	@RequestMapping("/templates/button.js")
	public String showButton(){
		return "button";
	}
	
	
	// @RequestMapping("/templates/Login.html")
	// public String lorem(){
	// 	return "Login";
	// }
		
	
	
}
