package com.example.syFinal.guest.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.example.syFinal.global.model.EmailDTO;
import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.guest.model.dao.InfoDAO;
import com.example.syFinal.guest.model.dao.LoginDAO;
import com.example.syFinal.guest.model.dao.MainDAO;
import com.example.syFinal.guest.model.dto.GuestDTO;
import com.example.syFinal.guest.model.dto.MainDTO;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("guest/info/*")
public class InfoController {
	@Autowired
	InfoDAO dao;
	
	@Autowired
	LoginDAO loginDao;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	PasswordEncoder pwdEncoder;
	
	@ResponseBody
	@PostMapping("checkEmail")
	public Map<String, Object> checkEmail(@RequestParam(name = "g_email", defaultValue = "") String g_email) {
		int count = dao.checkId(g_email);
		String result = "";
		String randomCode = "";
		if (count == 1) {
			result = "fail";
		} else if (count == 0) {
			randomCode = emailService.getTempPassword();
			//System.out.println(randomCode);
			EmailDTO emailPw = new EmailDTO();
			emailPw.setSubject("인증 코드 안내");
			emailPw.setMessage(
					"안녕하세요. 회원님의 인증 코드는 " + randomCode + " 입니다.");
			emailPw.setReceiveMail(g_email);
			emailPw.setSenderName("Notice");
			emailPw.setSenderMail("notice@gmail.com");
			result = emailService.sendMail(emailPw); 
			if (result.equals("fail")) {
				result = "error";
			}
		} 
		Map<String, Object> map = new HashMap<>();
		map.put("info_code", randomCode);
		map.put("result", result);
		return map;
	}
	
	@ResponseBody
	@PostMapping("join")
	public Map<String, Object> join(@RequestParam(name = "g_email", defaultValue = "") String g_email,
			@RequestParam(name = "g_passwd", defaultValue = "") String passwd, @RequestParam(name = "g_name", defaultValue = "") String g_name,
			@RequestParam(name = "g_phone", defaultValue = "") String g_phone) {
		String g_passwd = pwdEncoder.encode(passwd);
		String result = dao.join(g_email, g_passwd, g_name, g_phone);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("detail")
	public Map<String, Object> detail(@RequestParam(name = "g_idx", defaultValue = "") int g_idx) {
		GuestDTO dto = dao.detail(g_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		System.out.println(map);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("confirmPwd")
	public Map<String, Object> confirmPwd(@RequestParam(name = "g_email") String g_email, @RequestParam(name = "pwd") String g_passwd){
		String passwd = loginDao.chkPw(g_email);
		Map<String, Object> map = new HashMap<>();
		if(pwdEncoder.matches(g_passwd, passwd)){ 
			map.put("result", "success");
		} else if(passwd.equals("no")) {
			map.put("result", "error");
		} else {
			map.put("result", "no");
		}
		return map;		
	}
	
	@ResponseBody
	@RequestMapping("checkOrder")
	public Map<String, Object> checkOrder(@RequestParam(name = "g_idx") int g_idx) {
		int result = dao.checkOrder(g_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("update")
	public Map<String, Object> update(@RequestParam(name = "g_idx") int g_idx,
			@RequestParam(name = "g_profile", defaultValue = "") String g_profile,
			@RequestParam(name = "g_phone", defaultValue = "") String g_phone, 
			@RequestParam(name = "g_passwd", defaultValue = "") String passwd, 
			@RequestParam(name = "img", required = false ) MultipartFile img, 
			@RequestParam(name = "photo_img", required = false ) MultipartFile photo_img,HttpServletRequest request) {
		String filename = "";
		String photo = "";
		GuestDTO dto = dao.detail(g_idx);
		if (img != null && !img.isEmpty()) {
			filename = img.getOriginalFilename();
			try {
				String path = "C:\\Users\\user\\git\\final-project\\syFinal\\src\\main\\webapp\\static\\images\\guest\\profile\\";
				new File(path).mkdir();
				img.transferTo(new File(path+filename));
				dto.setG_url(filename);
			}catch (Exception e) {
				e.printStackTrace();
			}
		} 
		if (photo_img != null && !photo_img.isEmpty()) {
			photo = photo_img.getOriginalFilename();
			try {
				String path = "C:\\Users\\user\\git\\final-project\\syFinal\\src\\main\\webapp\\static\\images\\guest\\photo\\";
				new File(path).mkdir();
				photo_img.transferTo(new File(path+photo));
				dto.setG_photo(photo);
			}catch (Exception e) {
				e.printStackTrace();
			}
		} 
		if (passwd != "" && passwd.length() > 0 ) {
			String g_passwd = pwdEncoder.encode(passwd);
			dto.setG_passwd(g_passwd);
		}
		if (g_phone != "" && g_phone.length() > 0) { dto.setG_phone(g_phone);}
		if (g_profile != "" && g_profile.length() > 0) { dto.setG_profile(g_profile);}
		String result = dao.update(dto);
		Map<String, Object> map = new HashMap<>();
		map.put("g_photo", dto.getG_photo());
		map.put("g_profile", dto.getG_profile());
		map.put("g_phone", dto.getG_phone());
		map.put("result", result);
		return map;
	}
	
	@ResponseBody
	@PostMapping("delete") 
	public Map<String, Object> delete(@RequestParam(name = "g_idx") int g_idx) {
		UUID uuid = UUID.randomUUID();
		String delete_id = uuid.toString();
		String result = dao.delete(g_idx, delete_id);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}
	
	
	
}
