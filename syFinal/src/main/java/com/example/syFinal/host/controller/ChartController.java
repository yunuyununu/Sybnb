package com.example.syFinal.host.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.model.ReputationDAO;
import com.example.syFinal.host.model.dao.ChartDAO;
import com.example.syFinal.host.model.dao.OrderDAO;
import com.example.syFinal.host.model.dao.ReplyDAO;

@RestController
@RequestMapping("api/chart/*")
public class ChartController {
	@Autowired
	ChartDAO chartDao;
	@Autowired
	ReputationDAO reputationDao;
	@Autowired
	ReplyDAO replyDao;
	@Autowired
	OrderDAO orderDao;

	@GetMapping("labels/{userIdx}")
	public List<Map<String, Object>> hotelLabel(@PathVariable(name = "userIdx") int h_idx) {
		Map<String, Object> data = new HashMap<>();
		List<Map<String, Object>> list = chartDao.getHotelList(h_idx);
		return list;
	}

	@GetMapping("sales/{userIdx}")
	public Map<String, Object> salesDataset(@PathVariable(name = "userIdx") int h_idx) {
		Map<String, Object> data = new HashMap<>();
		List lastMonth = chartDao.lastSales(h_idx);
		data.put("lastMonth", lastMonth);
		List thisMonth = chartDao.thisSales(h_idx);
		data.put("thisMonth", thisMonth);
		return data;
	}

	@GetMapping("summary/{userIdx}")
	public Map<String, Object> summary(@PathVariable(name = "userIdx") int h_idx) {
		int totReviews = reputationDao.countRecord(h_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("sort", "reply");
		map.put("keyword", "미등록");
		int noReply = replyDao.count(map);
		List<Map<String, Object>> stars = reputationDao.avgStarList(h_idx);
		int pendings = orderDao.countPendings(h_idx);
		Map<String, Object> data = new HashMap<>();
		data.put("totReviews", totReviews);
		data.put("noReply", noReply);
		data.put("stars", stars);
		data.put("pendings", pendings);
		return data;
	}

}
