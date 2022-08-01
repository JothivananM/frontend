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

	@RequestMapping("/templates/404.html")
	public String show404(){
		return "404";
	}
	
	@RequestMapping("/templates/Employee-List.html")
	public String showEmployeeList(){
		return "Employee-List";
	}

	@RequestMapping("/templates/Timesheet-Management.html")
	public String showTimesheet(){
		return "Timesheet-Management";
	}
	
}
