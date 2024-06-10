package com.example.syFinal.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dao.AGuestDAO;
import com.example.syFinal.admin.model.dto.AGuestDTO;

@RestController
public class AGuestController {

	@Autowired
	AGuestDAO dao;

	@Autowired
	SqlSession sqlSession;

	@PostMapping("/admin/ag_list")
	public List<AGuestDTO> list(@RequestParam(name = "searchkey") String searchkey,
			@RequestParam(name = "search") String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("searchkey", searchkey);
		map.put("search", search);
		List<AGuestDTO> list = dao.list(searchkey, search);
		return list;
	}

	@ResponseBody
	@PostMapping("/admin/ag_detail")
	public Map<String, Object> detail(@RequestParam(name = "g_idx", defaultValue = "") int g_idx) {
		AGuestDTO dto = dao.detail(g_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		System.out.println(map);
		return map;
	}
	
	@PostMapping("/admin/ag_delete")
	public Map<String, Object> delete(@RequestParam(name = "g_idx") int g_idx) {
		String result = dao.delete(g_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}	
}