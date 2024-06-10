package com.example.syFinal.admin.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dao.MemoDAO;
import com.example.syFinal.admin.model.dto.MemoDTO;
import com.example.syFinal.global.PageUtil;

@RestController
public class MemoController {

	@Autowired
	MemoDAO memoDao;

	@RequestMapping("/memo/list")
	public Map<String, Object> list(@RequestParam(name = "curPage", defaultValue = "1") int curPage) {
		int count = memoDao.count(); // 레코드 개수
		PageUtil page = new PageUtil(count, curPage);
		int start = page.getPageBegin();
		int end = page.getPageEnd();
		List<MemoDTO> list = memoDao.list(start, end);

		Map<String, Object> map = new HashMap<>();
		map.put("list", list);
		map.put("count", count);
		map.put("page", page);
		return map;
	}

	@PostMapping("/memo/insert")
	public ResponseEntity<String> insert(@RequestParam Map<String, Object> map) {
		System.out.println("map " + map);
		try {
			memoDao.insert(map);
			return new ResponseEntity<>("true", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/memo/delete")
	public Map<String, Object> delete(@RequestParam(name = "me_idx") int me_idx) {
		String result = memoDao.delete(me_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}

	@PutMapping("/memo/update")
	public ResponseEntity<String> update(@RequestBody MemoDTO dto) {
		memoDao.update(dto);
		return new ResponseEntity<>("Memo updated successfully", HttpStatus.OK);
	}
}