package com.example.syFinal.guest.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.syFinal.MainController;
import com.example.syFinal.guest.model.dao.ReservDAO;
import com.example.syFinal.guest.model.dto.ReservDTO;

@Controller
@RequestMapping("guest/reserv/*")
public class ReservController {
	@Autowired
	ReservDAO dao;

	@RequestMapping("list")
	@ResponseBody
	public Map<String, Object> list(@RequestParam(name = "g_idx") int g_idx) {
		List<ReservDTO> dto = dao.list(g_idx);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date now = new Date();
		Date ck = new Date();
		Date nowdate = new Date();
		List<Map<String, Object>> after = new ArrayList<>();
		List<Map<String, Object>> before = new ArrayList<>();
		List<Map<String, Object>> be = new ArrayList<>();
		List<Map<String, Object>> review = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		
		for (int i = 0; i < dto.size(); i++) {
			try {
				ck = format.parse(dto.get(i).getO_ckin());
				nowdate = format.parse(format.format(now));
			} catch (Exception e) {
			}
			if (ck.after(now) || ck.equals(nowdate)) {
				Map<String, Object> map2 = new HashMap<>();
				map2.put("OIdx", dto.get(i).getO_idx());
				map2.put("HoImg", dto.get(i).getHo_img());
				map2.put("OCkin", dto.get(i).getO_ckin());
				map2.put("OCkout", dto.get(i).getO_ckout());
				map2.put("HName", dto.get(i).getH_name());
				map2.put("HoAddress", dto.get(i).getHo_address());
				map2.put("HoName", dto.get(i).getHo_name());
				map2.put("OdIdx", dto.get(i).getO_didx());
				after.add(map2);
			} else {
				Map<String, Object> map1 = new HashMap<>();
				map1.put("OIdx", dto.get(i).getO_idx());
				map1.put("HoImg", dto.get(i).getHo_img());
				map1.put("OCkin", dto.get(i).getO_ckin());
				map1.put("OCkout", dto.get(i).getO_ckout());
				map1.put("HName", dto.get(i).getH_name());
				map1.put("HoAddress", dto.get(i).getHo_address());
				map1.put("HoName", dto.get(i).getHo_name());
				map1.put("OdIdx", dto.get(i).getO_didx());
				before.add(map1);
			}
		}
		List<ReservDTO> dto3 = dao.reservReview(g_idx);
		for (int i = 0; i < dto3.size(); i++) {
			Map<String, Object> map3 = new HashMap<>();
			map3.put("OIdx", dto3.get(i).getO_idx());
			map3.put("HoImg", dto3.get(i).getHo_img());
			map3.put("OCkin", dto3.get(i).getO_ckin());
			map3.put("OCkout", dto3.get(i).getO_ckout());
			map3.put("HName", dto3.get(i).getH_name());
			map3.put("HoAddress", dto3.get(i).getHo_address());
			map3.put("HoName", dto3.get(i).getHo_name());
			map3.put("OdIdx", dto.get(i).getO_didx());
			review.add(map3);

		}
		for (int i = before.size()-1; i >= 0; i--) {
			be.add(before.get(i));
		}
		map.put("review", review);
		map.put("before", be);
		map.put("after", after);
		return map;
	}

	@RequestMapping("lastDetail")
	@ResponseBody
	public Map<String, Object> lastDetail(@RequestParam(name = "o_idx") int o_idx) {
		ReservDTO dto = dao.lastDetail(o_idx);
		int o_reser = dto.getO_adult() + dto.getO_child();
		dto.setO_reser(o_reser);
		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		String state_check = "";
		int check = dao.check(o_idx);
		if (check == 0) {
			state_check= "(변경 신청 거부)";
			map.put("state_check", state_check);
		}
		LocalDate date = LocalDate.parse(dto.getO_ckin());
		map.put("ref_date", date.minusDays(1));
		return map;
	}

	@RequestMapping("delDetail")
	@ResponseBody
	public Map<String, Object> delDetail(@RequestParam(name = "o_idx") int o_idx) {
		ReservDTO dto = dao.delDetail(o_idx);
		int o_reser = dto.getO_adult() + dto.getO_child();
		dto.setO_reser(o_reser);
		Map<String, Object> map = new HashMap<>();
		Date now = new Date();
		Date ref_date = new Date();
		String ck_time = dto.getO_ckin() + " " + dto.getHo_check_in();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Calendar cal1 = Calendar.getInstance();
		try {
			ref_date = format.parse(ck_time);
			cal1.setTime(ref_date);
			cal1.add(Calendar.DATE, -1);
		} catch (Exception e) {
		}
		String refund = "";
		int refund_money = 0;
		ref_date = new Date(cal1.getTimeInMillis()); // 환불 가능 기한
		if (ref_date.before(now)) {
			refund = "환불 불가능";
		} else {
			refund = "환불 가능";
			refund_money = dto.getO_finalprice();
		}
		map.put("dto", dto);
		map.put("refund", refund);
		map.put("refund_money", refund_money);
		return map;
	}

	@RequestMapping("cancel")
	@ResponseBody
	public Map<String, Object> cancel(@RequestParam(name = "o_idx") int o_idx,
			@RequestParam(name = "g_idx") int g_idx) {
		String result = dao.cancel(o_idx, g_idx);
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}

	@RequestMapping("upDetail")
	@ResponseBody
	public Map<String, Object> upDetail(@RequestParam(name = "o_idx") int o_idx) {
		List<String> bet_dates = new ArrayList<String>();	
		List<String> imp_dates = new ArrayList<String>();
		ReservDTO dto = dao.upDetail(o_idx);
		int check = dao.check(o_idx);
		String state = "";
		MainController main = new MainController();
		List<ReservDTO> date = dao.date(o_idx, dto.getHo_idx(), dto.getO_didx());
		for(int i=0; i < date.size(); i++) {
			bet_dates = main.dateBetween(date.get(i).getO_ckin(), date.get(i).getO_ckout());
			for(int j=0; j < bet_dates.size(); j++) {
				imp_dates.add(bet_dates.get(j));
			}
		}
		int roomCount = dao.room_count(o_idx);
		List<String> dates = new ArrayList<String>();
		Set<String> set = new HashSet<String>(imp_dates);        
		for (String str : set) {
			if (Collections.frequency(imp_dates, str) >= roomCount) {
				dates.add(str);
			}
		}
		
		Date ref_date = new Date();
		String alter = "";
		String date2 = dto.getO_ckin(); // 날짜1
		String date1 = dto.getO_ckout(); // 날짜2
		long diffSec = 0;
		long diffDays = 0;
		try {
			Date format1 = new SimpleDateFormat("yyyy-MM-dd").parse(date1);
			Date format2 = new SimpleDateFormat("yyyy-MM-dd").parse(date2);
			diffSec = (format1.getTime() - format2.getTime()) / 1000;
			diffDays = diffSec / (24 * 60 * 60);
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		if (check == 1) {
			ReservDTO dto2 = dao.confirm(o_idx);
			dto.setO_ckin(dto2.getRu_startDate());
			dto.setO_ckout(dto2.getRu_endDate());
			dto.setO_baby(dto2.getRu_adult());
			dto.setO_child(dto2.getRu_child());
			dto.setO_adult(dto2.getRu_adult());
			alter = "이미 아래와 같은 변경 신청 이력이 있습니다.";
		} else {
			dto.setO_reser(dto.getO_adult() + dto.getO_child());
			String ck_time = dto.getO_ckin() + " " + dto.getHo_check_in();
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			Calendar cal1 = Calendar.getInstance();
			try {
				ref_date = format.parse(ck_time);
				cal1.setTime(ref_date);
				cal1.add(Calendar.DATE, -1);
			} catch (Exception e) {
			}
			ref_date = new Date(cal1.getTimeInMillis()); // 환불 가능 기한
		}

		Map<String, Object> map = new HashMap<>();
		map.put("dto", dto);
		map.put("alter", alter);
		map.put("ref_date", ref_date);
		map.put("diffDays", diffDays);
		map.put("imp_dates", dates);
		return map;
	}

	@PostMapping("insert")
	@ResponseBody
	public Map<String, Object> insert(@RequestParam(name = "ru_idx") int ru_idx,
			@RequestParam(name = "g_idx") int g_idx, @RequestParam(name = "ru_adult") int ru_adult,
			@RequestParam(name = "ru_child") int ru_child, @RequestParam(name = "ru_baby") int ru_baby,
			@RequestParam(name = "ru_startDate") String ru_startDate,
			@RequestParam(name = "ru_endDate") String ru_endDate) {
		int check = dao.check(ru_idx);
		String result = "";
		if (check == 1) {
			result = dao.update(g_idx, ru_idx, ru_startDate, ru_endDate, ru_adult, ru_child, ru_baby);
		} else {
			result = dao.insert(g_idx, ru_idx, ru_startDate, ru_endDate, ru_adult, ru_child, ru_baby);
		}
		Map<String, Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}
	
	

}
