package com.example.syFinal.guest.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.syFinal.global.model.EmailDTO;
import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.guest.model.dao.LoginDAO;

@Controller
@RequestMapping("guest/login/*")
public class LoginController {
	@Autowired
	LoginDAO dao;

	@Autowired
	PasswordEncoder pwdEncoder;
	
	@Autowired
	EmailService emailService;
	
	@ResponseBody
	@PostMapping("login")
	public Map<String, Object> login(@RequestParam(name = "g_email", defaultValue = "") String g_email,
			@RequestParam(name = "g_passwd", defaultValue = "") String g_passwd) {
		String passwd = dao.chkPw(g_email);
		Map<String, Object> map1 = dao.login(g_email, passwd);
		Map<String, Object> map = new HashMap<>();
		// if (pwdEncoder.matches(passwd, g_passwd))
		if(pwdEncoder.matches(g_passwd, passwd)){ // 로그인 성공
			map.put("g_email", g_email);
			map.put("g_name", map1.get("g_name"));
			map.put("g_level", map1.get("g_level"));
			map.put("g_idx", map1.get("g_idx"));
			map.put("g_phone", map1.get("g_phone"));
			map.put("g_profile", map1.get("g_profile"));
			map.put("g_photo", map1.get("g_photo"));
			map.put("message", "success");
		} else if(passwd.equals("no")) {
			map.put("message", "no");
		} else {
			map.put("message", "error");
		}
		return map;
	}
	
	@ResponseBody
	@PostMapping("searchPw")
	public Map<String, Object> searchPw(@RequestParam(name = "g_email", defaultValue = "") String g_email, @RequestParam(name = "g_name", defaultValue = "") String g_name,
			@RequestParam(name = "g_phone", defaultValue = "") String g_phone) {
		int check = dao.searchPw(g_email, g_name, g_phone);
		Map<String, Object> map = new HashMap<>();
		String result = "";
		if (check == 0) {
			result = "no";
		} else if (check == 1) {
			String randomPw = emailService.getTempPassword();
			String passwd = pwdEncoder.encode(randomPw);
			dao.randomPw(g_email, passwd);
			EmailDTO dto = emailService.prepareTempPwdEmail(g_email, randomPw);
			result = emailService.sendMail(dto); 
		} else {
			result = "error";
		}
		map.put("result", result);
		return map;
	}
	
	@ResponseBody
	@PostMapping("searchMail")
	public Map<String, Object> searchMail(@RequestParam(name = "g_name", defaultValue = "") String g_name,
			@RequestParam(name = "g_phone", defaultValue = "") String g_phone) {
		String email = dao.searchEmail(g_name, g_phone);
		Map<String, Object> map = new HashMap<>();
		if (email.equals("no")) {
			map.put("message", "no");
		} else {
			map.put("g_email", email);
			map.put("message", "success");
		}
		return map;
	}
	
}
