package com.gewerbe.simpleProject.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

	
	@RequestMapping("/")
	public String sayHello() {
		
		return "<h1>Hello World</h1>";
	}
	
	
}
