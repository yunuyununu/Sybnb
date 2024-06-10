package com.example.syFinal.admin.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dao.AdminDAO;
import com.example.syFinal.admin.model.dto.AdminDTO;

import jakarta.servlet.http.HttpSession;

@RestController
public class ALoginController {

	@Autowired
	AdminDAO adminDao;

	@PostMapping("admin/adlogin")
	public Map<String, Object> adlogin(@RequestParam(name = "a_id") String a_id,
			@RequestParam(name = "a_passwd") String a_passwd, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		Map<String, Object> admin = adminDao.alogin(a_id, a_passwd);
		if (admin != null) {
			response.put("success", true);
			response.put("message", "로그인 성공");
			response.put("a_id", admin.get("a_id"));
			response.put("a_passwd", admin.get("a_passwd"));
		} else {
			response.put("success", false);
			response.put("message", "로그인 실패");
		}
		return response;
	}

	@RequestMapping("admin/chart")
	public Map<String, Object> chart() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
		Calendar c1 = Calendar.getInstance();
		String strToday = sdf.format(c1.getTime());
		
		Map<String, Object> map = new HashMap<>();
		List<AdminDTO> chart = adminDao.chart(strToday);
		System.out.println("chart:" + chart);
		
		List<Double> sumList = new ArrayList<>(); // 합계 집합 배열
		List<String> labelList = new ArrayList<>(); // 호텔명 집합 배열
		
		for (int i = 0; i<chart.size(); i++) {
			sumList.add(chart.get(i).getSum());
			labelList.add(chart.get(i).getHo_name());
		}
		
		map.put("sumList", sumList);
		map.put("labelList", labelList);
		map.put("month", strToday);
		// System.out.println("chart:" + map);
		return map;
	}
}
