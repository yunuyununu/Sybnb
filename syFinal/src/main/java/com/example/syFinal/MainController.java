package com.example.syFinal;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.admin.model.dto.ANoticeDTO;
import com.example.syFinal.guest.model.dao.MainDAO;
import com.example.syFinal.guest.model.dto.MainDTO;

@RestController
public class MainController {

	@Autowired
	MainDAO dao;
	
	@RequestMapping("/guest/main")
	public List<Map<String, Object>> list(@RequestParam(name="search",defaultValue="") String search,
			@RequestParam(name="g_idx", defaultValue="0") int g_idx) {
		List<MainDTO> main = dao.list(search);
		List<Map<String, Object>> list = new ArrayList<>();
		for(int i=0; i<main.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			map.put("HoIdx", main.get(i).getHo_idx());
			map.put("HoName", main.get(i).getHo_name());
			map.put("HoImg", main.get(i).getHo_img());
			map.put("Dprice", main.get(i).getD_price());
			map.put("Didx", main.get(i).getD_idx());
			map.put("Dimg1", main.get(i).getD_img1());
			map.put("Dimg2", main.get(i).getD_img2());
			map.put("Dimg3", main.get(i).getD_img3());
			map.put("Star", main.get(i).getStar());
			map.put("search", search);
			if (g_idx != 0) {
				int check = dao.check(main.get(i).getHo_idx(), g_idx);
				map.put("check", check);
			}
			list.add(map);
		}
		return list;
	}
	//메인 공지사항
	@GetMapping("main/notice")
	public Map<String, Object> noticelist() {
		List<ANoticeDTO> noticeList = dao.noticelist();
		Map<String, Object> list = new HashMap<>();
		list.put("list", noticeList);
		return list;
	}
	//메인 세부공지사항
	@GetMapping("main/noticedetail/{nidx}")
	public Map<String, Object> noticedetail(@PathVariable(name="nidx") int n_idx) {
		ANoticeDTO noticedetail = dao.noticedetail(n_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", noticedetail);
		return map;
	}
	
	public List<String> dateBetween(String stDate, String etDate) {
		List<String> dates = new ArrayList<String>();
		String sDate = stDate.replace("-", "");
		String eDate = etDate.replace("-", "");
		String inputStartDate = stDate;
		String inputEndDate = etDate;
		Date startDate = new Date();
		Date endDate = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date currentDate = new Date();
		try {
			startDate = sdf.parse(inputStartDate);
			endDate = sdf.parse(inputEndDate);
			currentDate	= startDate;
			while (currentDate.compareTo(endDate) < 0) {
				dates.add(sdf.format(currentDate));
				Calendar c = Calendar.getInstance();
				c.setTime(currentDate);
				c.add(Calendar.DATE, 1);
				currentDate = c.getTime();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dates;
	}
}
