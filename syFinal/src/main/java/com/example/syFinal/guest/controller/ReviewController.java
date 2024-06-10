package com.example.syFinal.guest.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.model.ReputationDAO;
import com.example.syFinal.guest.model.dao.ReviewDAO;

@RestController
@RequestMapping("api/review/*")
public class ReviewController {
	@Autowired
	ReviewDAO reviewDao;

	@Autowired
	ReputationDAO reputationDao;

	@Transactional
	@PostMapping("insert")
	public ResponseEntity<String> insert(@RequestParam Map<String, Object> map) {
		try {
			reviewDao.insertReview(map);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("detail/{idx}")
	public Map<String, Object> detail(@PathVariable(name = "idx") int rv_idx) {
		Map<String, Object> review = reputationDao.reviewDetail(rv_idx);
		return review;
	}

	@Transactional
	@PostMapping("edit/{idx}")
	public ResponseEntity<String> editReview(@PathVariable(name = "idx") int rv_idx,
			@RequestParam Map<String, Object> map) {
		try {
			reviewDao.editReview(map);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

	@Transactional
	@GetMapping("delete/{idx}")
	public ResponseEntity<String> updateDeleted(@PathVariable(name = "idx") int rv_idx) {
		try {
			reviewDao.updateDeleted(rv_idx);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

}
