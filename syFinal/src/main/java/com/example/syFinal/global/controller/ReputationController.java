package com.example.syFinal.global.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.PageUtil;
import com.example.syFinal.global.model.ReputationDAO;

@RestController
@RequestMapping("api/reputation/*")
public class ReputationController {
	@Autowired
	ReputationDAO reputationDao;

	@GetMapping("list/{HoIdx}")
	public Map<String, Object> getHotelReviews(@PathVariable(name = "HoIdx") int ho_idx) {
		Map<String, Object> data = new HashMap<>();
		List<Map<String, Object>> list = reputationDao.getHotelReviews(ho_idx);
		if (list.isEmpty()) {
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		} else {
			data.put("list", list);
			data.put("avg", reputationDao.calcAvgRate(ho_idx));
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		}
		return data;
	}

	@PostMapping("manage/list/{userIdx}")
	public Map<String, Object> getAllReviews(@PathVariable(name = "userIdx") int h_idx,
			@RequestParam(name = "pageNum", defaultValue = "1") int pageNum) {
		int cnt = reputationDao.countRecord(h_idx);
		Map<String, Object> data = new HashMap<>();
		PageUtil page = new PageUtil(cnt, pageNum);
		int start = page.getPageBegin() - 1;
		if (cnt == 0) {
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		} else {
			List<Map<String, Object>> list = reputationDao.getAllReviews(h_idx, start);
			data.put("list", list);
			data.put("avgList", reputationDao.getAvgRate(h_idx));
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		}
		data.put("count", cnt);
		data.put("page", page);
		data.put("option", 0);
		return data;
	}

	@GetMapping("reply/{rp_idx}")
	public Map<String, Object> getReply(@PathVariable(name = "rp_idx") int rp_idx) {
		Map<String, Object> reply = null;
		Map<String, Object> data = new HashMap<>();
		if (rp_idx != 0) {
			reply = reputationDao.getReply(rp_idx);
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		} else {
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		}
		data.put("reply", reply);
		return data;
	}

	@PostMapping("review/search")
	public Map<String, Object> reviewSearch(@RequestParam Map<String, Object> map) {
		List<Map<String, Object>> list = reputationDao.reviewSearch(map);
		Map<String, Object> data = new HashMap<>();
		if (list == null) {
			data.put("response", new ResponseEntity<>("false", HttpStatus.NO_CONTENT));
		} else {
			data.put("list", list);
			data.put("response", new ResponseEntity<>("true", HttpStatus.OK));
		}
		return data;
	}

}
