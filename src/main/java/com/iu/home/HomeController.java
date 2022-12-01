package com.iu.home;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class HomeController {
	
	
	@GetMapping("/")
	public String home(HttpSession session) throws Exception {
		log.info("--홈진입--");
		return "index";
	}
}
