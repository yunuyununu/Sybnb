package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.model.EmailDTO;
import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.host.model.dao.HostDAO;

@RestController
@RequestMapping("api/host/login/*")
public class HostLoginController {
	@Autowired
	HostDAO hostDao;

	@Autowired
	PasswordEncoder pwdEncoder;

	@Autowired
	EmailService emailService;

	@PostMapping("/")
	public Map<String, Object> login(@RequestParam Map<String, Object> map) {
		String userEmail = (String) map.get("userEmail");
		String pwd = (String) map.get("pwd");
		String savedPwd = hostDao.pwdCheck(userEmail);
		Map<String, Object> data = new HashMap<>();
		if (pwdEncoder.matches(pwd, savedPwd)) {
			data.put("dto", hostDao.makeCookie(userEmail));
			data.put("msg", "success");
		} else {
			data.put("msg", "error");
		}
		return data;
	}

	@PostMapping("findId")
	public Map<String, Object> findId(@RequestParam Map<String, Object> map) {
		Map<String, Object> data = new HashMap<>();
		data.put("h_email", hostDao.findId(map));
		return data;
	}

	@PostMapping("findPwd")
	public Map<String, Object> findPwd(@RequestParam Map<String, Object> map) {
		int cheked = hostDao.findPwd(map);
		Map<String, Object> data = new HashMap<>();
		if (cheked > 0) { // 입력한 정보와 일치하는 계정이 있을 경우,
			String email = (String) map.get("userEmail");
			String randomPw = emailService.getTempPassword();
			String encodedPwd = pwdEncoder.encode(randomPw);
			map.put("pwd", encodedPwd);
			hostDao.setTempPwd(map); // 임시 비밀번호로 업데이트
			EmailDTO emailPw = emailService.prepareTempPwdEmail(email, randomPw);
			String msg = emailService.sendMail(emailPw);
			if (msg.equals("success")) {
				data.put("msg", msg);
			} else {
				data.put("msg", msg);
			}
		} else {
			data.put("msg", "입력하신 정보와 일치하는 계정이 없습니다.");
		}
		return data;
	}

}
