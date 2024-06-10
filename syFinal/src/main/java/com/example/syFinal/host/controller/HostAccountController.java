package com.example.syFinal.host.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.syFinal.global.model.EmailService;
import com.example.syFinal.host.model.dao.HostDAO;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("api/host/*")
public class HostAccountController {
	@Autowired
	HostDAO hostDao;

	@Autowired
	PasswordEncoder pwdEncoder;

	@Autowired
	EmailService emailService;

	@PostMapping("idCheck")
	public Map<String, Object> idCheck(@RequestParam(name = "userEmail", defaultValue = "") String userEmail) {
		// id 중복검사
		int checked = hostDao.idCheck(userEmail);
		Map<String, Object> data = new HashMap<>();
		if (userEmail.equals("undefined") || checked > 0) {
			data.put("msg", "error");
		} else {
			data.put("msg", "ok");
		}
		return data;
	}

	@GetMapping("pwdCheck/{pwd}")
	public ResponseEntity<String> pwdCheck(@PathVariable(name = "pwd") String pwd,
			@RequestParam(name = "userEmail", defaultValue = "") String userEmail) {
		String savedPwd = hostDao.pwdCheck(userEmail);
		if (pwdEncoder.matches(pwd, savedPwd)) {
			return new ResponseEntity<>("true", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

	@Transactional
	@PostMapping("join")
	public Map<String, Object> join(@RequestParam Map<String, Object> map,
			@RequestParam(name = "profile", required = false) MultipartFile profile,
			@RequestParam(name = "file", required = false) MultipartFile file,
			@RequestParam(name = "bankbook", required = false) MultipartFile bankbook, HttpServletRequest request) {
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/profile/");
		String h_profile = "-";
		String h_file = "-";
		String h_bankbook = "-";

		if (profile != null && !profile.isEmpty()) {
			try {
				h_profile = profile.getOriginalFilename();
				profile.transferTo(new File(path + h_profile));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		map.put("h_profile", h_profile);
		if (file != null && !file.isEmpty()) {
			try {
				h_file = file.getOriginalFilename();
				file.transferTo(new File(path + h_file));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		map.put("h_file", h_file);
		if (bankbook != null && !bankbook.isEmpty()) {
			try {
				h_bankbook = bankbook.getOriginalFilename();
				bankbook.transferTo(new File(path + h_bankbook));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		map.put("h_bankbook", h_bankbook);

		// 비밀번호 암호화
		String encodedPwd = pwdEncoder.encode((CharSequence) map.get("pwd"));
		map.replace("pwd", encodedPwd);
		hostDao.insert(map);
		Map<String, Object> data = new HashMap<>();
		data.put("msg", "success");
		return data;
	}

	@GetMapping("account/{userIdx}")
	public Map<String, Object> getAccount(@PathVariable(name = "userIdx") int h_idx) {
		Map<String, Object> data = hostDao.getAccount(h_idx);
		return data;
	}

	@Transactional
	@PostMapping("update/{userIdx}")
	public void updateInfo(@PathVariable(name = "userIdx") int h_idx, @RequestParam Map<String, Object> map,
			@RequestParam(name = "profile", required = false) MultipartFile profile,
			@RequestParam(name = "file", required = false) MultipartFile file,
			@RequestParam(name = "bankbook", required = false) MultipartFile bankbook, HttpServletRequest request) {
		ServletContext application = request.getSession().getServletContext();
		String path = application.getRealPath("static/images/host/profile/");
		String h_profile = "";
		String h_file = "";
		String h_bankbook = "";
		if (profile != null && !profile.isEmpty()) { // 새 프로필을 업로드 한 경우,
			try {
				String profile1 = hostDao.getFile(h_idx, "h_profile");
				if (profile1 != null && !profile1.equals("-")) {
					// 기존에 프로필이 설정되어 있으면 기존파일 삭제
					File file1 = new File(path + profile1);
					if (file1.exists()) {
						file1.delete();
					}
				}
				// 새로 업로드한 프로필을 저장
				h_profile = profile.getOriginalFilename();
				profile.transferTo(new File(path + h_profile));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			h_profile = hostDao.getFile(h_idx, "h_profile"); // 새 파일을 업로드하지 않은 경우
		}
		map.put("h_profile", h_profile);

		if (file != null && !file.isEmpty()) {
			h_file = file.getOriginalFilename();
			try {
				file.transferTo(new File(path + h_file));
				map.put("h_file", h_file);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			h_file = hostDao.getFile(h_idx, "h_file");
		}
		map.put("h_file", h_file);
		if (bankbook != null && !bankbook.isEmpty()) {
			h_bankbook = bankbook.getOriginalFilename();
			try {
				bankbook.transferTo(new File(path + h_bankbook));
				map.put("h_bankbook", h_bankbook);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			h_bankbook = hostDao.getFile(h_idx, "h_bankbook");
		}
		map.put("h_bankbook", h_bankbook);

		// 비밀번호 암호화
		String encodedPwd = pwdEncoder.encode(map.get("pwd").toString());
		map.replace("pwd", encodedPwd);

		hostDao.updateInfo(map);
	}

	@Transactional
	@GetMapping("delete/{userIdx}")
	public String deleteAccount(@PathVariable(name = "userIdx") int h_idx,
			@RequestParam(name = "userEmail", defaultValue = "") String h_email, HttpServletRequest request)
			throws Exception {
		String h_profile = hostDao.getFile(h_idx, "h_profile");
		String h_file = hostDao.getFile(h_idx, "h_file");
		String h_bankbook = hostDao.getFile(h_idx, "h_bankbook");
		if (hostDao.checkOrders(h_idx)) {
			try { // 저장된 프로필, 첨부파일, 통장사본이 있으면 삭제
				if (h_profile != null && !h_profile.equals("-")) {
					ServletContext application = request.getSession().getServletContext();
					String path = application.getRealPath("static/images/host/profile/");
					File profile = new File(path + h_profile);
					if (profile.exists()) {
						profile.delete();
					}
				}

				if (h_file != null && !h_file.equals("-")) {
					ServletContext application = request.getSession().getServletContext();
					String path = application.getRealPath("static/images/host/profile/");
					File file = new File(path + h_file);
					if (file.exists()) {
						file.delete();
					}
				}

				if (h_bankbook != null && !h_bankbook.equals("-")) {
					ServletContext application = request.getSession().getServletContext();
					String path = application.getRealPath("static/images/host/profile/");
					File bankbook = new File(path + h_bankbook);
					if (bankbook.exists()) {
						bankbook.delete();
					}
				}
				UUID uuid = UUID.randomUUID();
				String deletedEmail = uuid.toString();
				hostDao.deleteAccount(h_idx, deletedEmail); // 테이블에서 해당 계정정보 : 탈퇴한 회원으로 업데이트
				return "complete";
			} catch (Exception e) {
				throw new Exception();
			}
		} else {
			throw new Exception();
		}
	}

	@Transactional
	@GetMapping("levelUp/{userIdx}")
	public ResponseEntity<String> levelUp(@PathVariable(name = "userIdx") int h_idx) {
		try {
			hostDao.levelUp(h_idx);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

}
